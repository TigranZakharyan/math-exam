import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsingJoinColumnOnlyOnOneSideAllowedError } from 'typeorm';
import { QuestionsService } from './questions.service';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('random/:limit')
  getRandomly(@Param('limit') limit: number) {
    console.log(limit)
    return this.questionsService.getRandomly(limit || 1);
  }
}
