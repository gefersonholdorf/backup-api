import { Injectable } from "@nestjs/common";
import { CreateDeployDTO } from "./dto/create-deploy.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DeployEntity } from "./entity/deploy.entity";
import { Repository } from "typeorm";

@Injectable()
export class DeployService {

    constructor(@InjectRepository(DeployEntity) private deployRepository : Repository<DeployEntity>) {}

    async create(createDeploy : CreateDeployDTO) {
        console.log(createDeploy)

        try {
            const newDeploy = await this.deployRepository.create({
                ...createDeploy
            })

            await this.deployRepository.save(newDeploy)

            return {
                status: "Deploy Registrado com sucesso!"
            }

        } catch (error) {
            console.log('Entrou no erro')
            console.log(error)
            return
        }
    }

    async findAll() {
        try {
            return this.deployRepository.find()
        } catch (error) {
            console.log(error)
            return
        }
    }
}