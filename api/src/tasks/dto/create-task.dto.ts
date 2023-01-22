import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Task } from '../types/task.type';

export class CreateTaskDto implements Omit<Task, 'checked'> {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: Number,
    default: new Date(),
  })
  @IsNotEmpty()
  dueDate: Date;
}
