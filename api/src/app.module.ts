import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UsersModule } from './users/users.module';
import { CryptModule } from './crypt/crypt.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { authConfig } from './config/auth.config';
import { databaseConfig } from './config/database.config';
import { TasksModule } from './tasks/tasks.module';
import { AwsService } from './aws/aws.service';
import { AwsModule } from './aws/aws.module';
import { awsConfig } from './config/aws.config';
import { QuestionsModule } from './questions/questions.module';
import { FilesModule } from './files/files.module';
import { QuizesModule } from './quizes/quizes.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfig, databaseConfig, awsConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('database'),
      }),
      inject: [ConfigService],
    }),
    NestjsFormDataModule,
    UsersModule,
    BooksModule,
    CryptModule,
    AuthModule,
    TasksModule,
    AwsModule,
    QuestionsModule,
    FilesModule,
    QuizesModule,
    VideosModule,
  ],
  providers: [AwsService],
})

export class AppModule {}
