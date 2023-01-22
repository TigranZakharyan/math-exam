import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { HasRoles } from 'src/decorators/has-roles.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizesService } from './quizes.service';

@ApiTags('Quizes')
@Controller('quizes')
export class QuizController {
  constructor(private quizesService: QuizesService) {}

  @ApiOperation({ summary: 'Admin' })
  @ApiBearerAuth()
  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  create(@Body() dto: CreateQuizDto) {
    return this.quizesService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  get() {
    return this.quizesService.getAll();
  }

  @ApiOperation({ summary: 'Admin' })
  @ApiBearerAuth()
  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.quizesService.deleteById(id);
  }
}
