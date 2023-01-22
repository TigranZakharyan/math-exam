import { Module } from '@nestjs/common';
import { CryptService } from './crypt.service';

@Module({
  exports: [CryptService],
  providers: [CryptService],
})
export class CryptModule {}
