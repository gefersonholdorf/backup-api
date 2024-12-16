import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationEntity } from "./entity/notification.entity";

@Module({
    imports: [TypeOrmModule.forFeature([NotificationEntity])],
    providers: [NotificationService],
    controllers: [NotificationController]
})
export class NotificationModule{}