import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from 'src/entity/tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
  ) {}

  async create(dto: CreateTaskDto) {
    try {
      const newTaskObj = this.tasksRepository.create(dto);
      const result = await this.tasksRepository.save(newTaskObj);
      return result;
    } catch (err) {
      console.log(err);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  getAll() {
    return this.tasksRepository.find({});
  }

  async update(id: number, dto: UpdateTaskDto) {
    const property = await this.tasksRepository.findOne({
      where: { id },
    });

    return this.tasksRepository.save({
      ...property,
      ...dto,
    });
  }

  delete(id: number) {
    return this.tasksRepository.delete({ id });
  }
}
