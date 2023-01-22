import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Quizes } from './quizes.entity';
import { QuizesAnswers } from './quizes_answers.entity';

@Entity()
export class QuizesQuestions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Quizes, (quiz) => quiz.questions)
  quiz: Quizes;

  @Column()
  title: string;

  @OneToMany(() => QuizesAnswers, (answer) => answer.question, {
    eager: true,
  })
  answers: QuizesAnswers[];

  @CreateDateColumn({
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: false,
  })
  updatedAt: Date;
}
