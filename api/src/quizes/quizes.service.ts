import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quizes } from 'src/entity/quizes.entity';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizesService {
  constructor(
    @InjectRepository(Quizes)
    private quizRepository: Repository<Quizes>,
  ) {}

  create(dto: CreateQuizDto) {
    const quiz: Quizes = this.quizRepository.create(dto);
    return this.quizRepository.save(quiz);
  }

  getAll() {
    return this.quizRepository.find({
      relations: {
        questions: true,
      },
    });
  }

  async deleteById(id: number) {
    // this.quizRepository.remove({ id });
  }
}
