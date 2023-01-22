import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../types/task.type';

export class UpdateTaskDto implements Task {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  checked?: boolean;

  @ApiProperty()
  dueDate?: Date;
}
