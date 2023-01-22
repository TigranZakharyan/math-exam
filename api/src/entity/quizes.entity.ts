import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { QuizesQuestions } from './quizes_questions.entity';

@Entity()
export class Quizes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @OneToMany(() => QuizesQuestions, (question) => question.quiz, {
    cascade: ['soft-remove'],
    onDelete: 'CASCADE',
  })
  questions: QuizesQuestions[];

  @CreateDateColumn({
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: false,
  })
  updatedAt: Date;
}
