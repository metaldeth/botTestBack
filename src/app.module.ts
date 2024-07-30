import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import {
  AuthModule,
  TaskModule,
} from './domains'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path/posix';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TaskModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../workers-task-front', 'build'),
    })
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
