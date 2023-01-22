import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { HasRoles } from 'src/decorators/has-roles.decorator';
import { Role } from 'src/enums/role.enum';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DeleteManyBooksDto } from './dto/delete-many-books.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Admin' })
  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'file' }, { name: 'preview' }]),
  )
  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  create(
    @Body() dto: CreateBookDto,
    @UploadedFiles()
    {
      file,
      preview,
    }: { file: Express.Multer.File[]; preview: Express.Multer.File[] },
  ) {
    return this.booksService.create({
      ...dto,
      file: file[0],
      preview: preview[0],
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.booksService.findAll();
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @Put(':id')
  // update(@Param('id') id: number, @Body() dto: UpdateBookDto) {
  // return this.tasksService.update(id, dto);
  // }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin' })
  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.booksService.deleteById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin' })
  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete()
  deleteMany(@Body() dto: Array<number>) {
    return this.booksService.deleteMany(dto);
  }
}
