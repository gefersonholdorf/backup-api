import { Module } from "@nestjs/common";
import { DeployService } from "./deploy.service";
import { DeployController } from "./deploy.controller";
import { DeployEntity } from "./entity/deploy.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    providers: [DeployService],
    controllers: [DeployController],
    imports:[TypeOrmModule.forFeature([DeployEntity])]
})
export class DeployModule {

}