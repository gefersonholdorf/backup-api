import { Body, Controller, Post } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller('backup-api')
export class NotificationController {

    constructor(private readonly notificationService : NotificationService){}

    @Post('new-notification')
    async newNotification(@Body() body : any) {
        console.log(body)
        return this.notificationService.getNotification(body)
    }

    @Post('update-notification-progress')
    async updateNotificationProgress(@Body() body : any) {
        console.log(body)
        return this.notificationService.updateNotificationProgress(body)
    }

    @Post('update-notification-finish')
    async updateNotificationFinish(@Body() body : any) {
        console.log(body)
        return this.notificationService.updateNotificationFinish(body)
    }
}