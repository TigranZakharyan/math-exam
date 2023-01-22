import { Module } from '@nestjs/common';
import { QuizesService } from './quizes.service';
import { QuizController } from './quizes.controller';
import { Quizes } from 'src/entity/quizes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizesQuestions } from 'src/entity/quizes_questions.entity';
import { QuizesAnswers } from 'src/entity/quizes_answers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quizes, QuizesQuestions, QuizesAnswers])],
  providers: [QuizesService],
  controllers: [QuizController]
})
export class QuizesModule { }
