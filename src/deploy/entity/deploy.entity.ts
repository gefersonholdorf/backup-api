import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('deploys')
export class DeployEntity{

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    system : string

    @Column()
    typeDeploy : string

    @Column()
    date : Date
}