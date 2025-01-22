import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateBackupDTO } from "./dto/create-backup.dto";
import { Repository } from "typeorm";
import { BackupEntity } from "./entity/backup.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Cron } from "@nestjs/schedule";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class BackupService {

    constructor(
        @InjectRepository(BackupEntity) private readonly backupRepository : Repository<BackupEntity>,
        private readonly httpService : HttpService
    ) {
    }

    private dateActual = this.dataFormat(new Date())

    private readonly nameSystemArquives = [
        `diamante_george_${this.dateActual}.json`,
        `diamante_orben_${this.dateActual}.json`,
        `diamante_agenol_${this.dateActual}.json`,
        `bot-george_${this.dateActual}.json`,
        `DOESC_${this.dateActual}.json`,
        `biller-gov_${this.dateActual}.json`,
        `BILLER-BD_${this.dateActual}.json`,
    ]

    @Cron('*/1 * * * *')
    async getJsonData() {
        console.log('Cron executada')
        for (let file of this.nameSystemArquives) {
            console.log(file)
            try {
                const response = await lastValueFrom(
                    this.httpService.get(`${process.env.URL_STORAGE}/${file}`)
                )
    
                if (!response.data) {
                    console.log(`Arquivo ${file} não possui dados.`);
                    continue
                }
                await this.create(response.data)

                continue

            } catch (error) {
                try {
                    const name = file.split('_')[0]

                    const isInsert = await this.verifyInsert(name, 0)
                    if (isInsert) {
                        continue
                    }

                    const nameFormat = name.toUpperCase()
                    const backup = await this.backupRepository.create({
                        name: nameFormat,
                        date: this.dateActual,
                        status: 0
                    })

                    await this.backupRepository.save(backup)
                    continue
                } catch (error) {
                    console.log('Erro ao inserir novo registro de backup!')
                }
            }
        }
    }

    async create(createBackupDTO : CreateBackupDTO) {
        const name = createBackupDTO.name.toUpperCase()

        const isInsert = await this.verifyInsert(createBackupDTO.name, createBackupDTO.status)
        console.log(isInsert)
        if (isInsert) {
            return
        }
        const newDate = createBackupDTO.date
        
        try {
             const backup = await this.backupRepository.create({
                ...createBackupDTO,
                name, 
                date: newDate
             })
    
             await this.backupRepository.save(backup)

             return 

         } catch (error) {
             throw new BadRequestException("Erro ao criar novo registro do backup")
         }
    }

    async findAll() {
        const backups = await this.backupRepository.createQueryBuilder('bkp')
            .where(
                `bkp.id = (
                select MAX(bkp2.id)
                from system_backup bkp2
                where bkp2.name = bkp.name
                )`
            )
            .getMany()

        const newBackups = await backups.map((backup) => {
            const dataActualFormat = this.dataFormat(backup.date)

            if (dataActualFormat < this.dateActual) {
                backup.status = 0
            }

            return {
                ...backup,
                date: this.dataFormat(backup.date)
            }
        })

        return newBackups
    }

    dataFormat(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
    
        const formatter = new Intl.DateTimeFormat('pt-BR', options);
        const formatted = formatter.format(date);
    
        const [day, month, year] = formatted.split('/');
        return `${year}-${month}-${day}`;
    }

    dataFormatDatabase(date : Date) {
        return `${date.getFullYear()}-${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}`
    }

    async verifyInsert(name : string, status : number) {
        const backups = await this.backupRepository.createQueryBuilder('bkp')
            .where('bkp.name LIKE :name', {name: `%${name.toUpperCase()}%`})
            .andWhere('DATE(bkp.date) = :date', {date: `${this.dateActual}`})
            .getMany()

        if (backups.length == 1) {
            if (status == 1 && backups[0].status == 0) {
                return false
            }

            return true
        }

        if (backups.length > 1) {
            return true
        }

        return false
    }
}