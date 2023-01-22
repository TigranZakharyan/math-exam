import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsService } from './aws.service';
import { CryptModule } from '../crypt/crypt.module';

@Module({
  imports: [ConfigModule, CryptModule],
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {}
