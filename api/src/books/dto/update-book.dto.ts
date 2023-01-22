import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../types/book.type';

export class UpdateBookDto implements Book {
  @ApiProperty()
  title?: string;
}
