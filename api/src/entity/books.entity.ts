import { integer } from 'aws-sdk/clients/cloudfront';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Books extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  author: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  file: string;

  @Column({
    default: 0,
    type: 'integer'
  })
  watched: integer;

  @Column('varchar')
  preview: string;

  @CreateDateColumn({
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: false,
  })
  updatedAt: Date;
}
