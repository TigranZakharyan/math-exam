import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsService } from 'src/aws/aws.service';
import { Books } from 'src/entity/books.entity';
import { In, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
    private awsService: AwsService,
  ) {}

  async create(dto: CreateBookDto) {
    try {
      const file: string = await this.awsService.uploadFile(dto.file);
      const preview: string = await this.awsService.uploadFile(dto.preview);
      delete dto.file;
      delete dto.preview;
      const newBookObj = this.booksRepository.create({
        ...dto,
        file,
        preview,
      });
      const result = await this.booksRepository.save(newBookObj);
      return result;
    } catch (err) {
      console.log(err);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  findAll() {
    return this.booksRepository.find({});
  }

  async deleteById(id: number) {
    const bookById = await this.booksRepository.findOneBy({ id });
    this.awsService.deleteFiles([bookById.file, bookById.preview]);
    return this.booksRepository.delete({ id });
  }

  deleteMany(ids: Array<number>) {
    return this.booksRepository.delete({ id: In(ids) });
  }
}
