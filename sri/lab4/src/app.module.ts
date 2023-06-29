import { Module } from '@nestjs/common';
import { BolidModule } from './bolid/bolid.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MonitorModule } from './monitor/monitor.module';
import { MasterModule } from './master/master.module';
import { MechanicModule } from './mechanic/mechanic.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BolidModule,
    LoggerModule,
    ScheduleModule.forRoot(),
    MonitorModule,
    MasterModule,
    MechanicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
