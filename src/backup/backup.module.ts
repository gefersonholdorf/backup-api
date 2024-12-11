import { Module } from "@nestjs/common";
import { BackupController } from "./backup.controller";
import { BackupService } from "./backup.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BackupEntity } from "./entity/backup.entity";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [TypeOrmModule.forFeature([BackupEntity]), HttpModule],
    controllers: [BackupController],
    providers: [BackupService],
    exports: [BackupService]
})
export class BackupModule {

}