import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from 'src/entity/users.entity';
import { CryptService } from 'src/crypt/crypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private cryptService: CryptService,
  ) {}

  async create(dto: CreateUserDto) {
    try {
      dto.password = this.cryptService.encrypt(dto.password);
      const newUserObj = this.usersRepository.create(dto);
      const result = await this.usersRepository.save(newUserObj);
      delete result.password;
      return result;
    } catch (err) {
      throw new HttpException('User exists', HttpStatus.FOUND);
    }
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  findAll() {
    return this.usersRepository.find({});
  }
}
