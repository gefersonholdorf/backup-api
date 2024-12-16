import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notifications')
export class NotificationEntity{

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    status : number
}