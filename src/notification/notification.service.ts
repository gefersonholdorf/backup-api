import { Inject, Injectable } from "@nestjs/common";
import { NotificationEntity } from "./entity/notification.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class NotificationService {

    constructor(@InjectRepository(NotificationEntity) private readonly notificationRepository : Repository<NotificationEntity>) {}

    async getNotification(body : any) {
        const newNotification = {
            name: body.key,
            status: 1
        }
        const notification = await this.notificationRepository.create(newNotification)
        console.log(notification)

        await this.notificationRepository.save(notification)
        return {
            status: 'sucess'
        }
    }

    async updateNotificationProgress(body : any) {
        const status = 2

        const notification = await this.notificationRepository.findOne({
            where: {
                name: body.key
            }
        })

        if(!notification) {
            console.log('Task não encontrada')
        }

        await this.notificationRepository.update(notification.id, {
            status
        })

        return {
            status: 'sucess'
        }
    }

    async updateNotificationFinish(body : any) {
        const status = 0

        const notification = await this.notificationRepository.findOne({
            where: {
                name: body.key
            }
        })

        if(!notification) {
            console.log('Task não encontrada')
        }

        await this.notificationRepository.update(notification.id, {
            status
        })

        return {
            status: 'sucess'
        }
    }
}