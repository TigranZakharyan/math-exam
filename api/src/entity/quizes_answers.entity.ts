import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { QuizesQuestions } from './quizes_questions.entity';

@Entity()
export class QuizesAnswers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => QuizesQuestions, (question) => question.answers)
  question: QuizesQuestions;

  @Column({ default: false })
  isCorrect: boolean;

  @CreateDateColumn({
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: false,
  })
  updatedAt: Date;
}
