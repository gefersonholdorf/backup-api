import { timestamp } from "rxjs";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('system_backup')
export class BackupEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column({
        type: "varchar",
        length: 40
    })
    name : string

    @Column()
    date : Date

    @Column({
        type: "integer"
    })
    status : number

    @Column({
        type: "varchar",
        default: 0
    })
    size ?: string
}