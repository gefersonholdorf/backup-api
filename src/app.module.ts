import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackupModule } from './backup/backup.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupEntity } from './backup/entity/backup.entity';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BackupService } from './backup/backup.service';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: [
      `.env.${process.env.NODE_ENV || 'production'}`,
    ],
    isGlobal: true
  }),TypeOrmModule.forRoot({
    type: 'mysql',
    host: `${process.env.BD_HOST}`,
    port: Number(`${process.env.BD_PORT}`) ,
    username: `${process.env.BD_USER}`,
    password: `${process.env.BD_PASSWORD}`,
    database: `${process.env.BD_DATABASE}`,
    entities: [BackupEntity],
    synchronize: false,
  }),
  BackupModule,
  ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor(private readonly backupService : BackupService) {
      this.backupService.getJsonData()
    }
}
