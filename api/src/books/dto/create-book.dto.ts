import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Book } from '../types/book.type';

export class CreateBookDto implements Book {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  preview: Express.Multer.File;
}
