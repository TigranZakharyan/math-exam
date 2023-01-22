import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptService {
  encrypt(data: string): string {
    return bcrypt.hashSync(data, this.salt());
  }
  verify(data: string, hash: string): boolean {
    return bcrypt.compareSync(data, hash);
  }
  private salt(): string {
    return bcrypt.genSaltSync();
  }
}
