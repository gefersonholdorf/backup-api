import { Controller, Get } from "@nestjs/common";
import { BackupService } from "./backup.service";

@Controller('backup-api') 
export class BackupController {

    constructor(private readonly backupService : BackupService) {}

    @Get('status')
    async findAll() {
        return this.backupService.findAll()
    }
}