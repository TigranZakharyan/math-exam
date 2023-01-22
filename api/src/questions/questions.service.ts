import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly filesService: FilesService) {}

  getRandomly(limit: number): string {
    const $ = this.filesService.parseQuestionsHTML();
    const length = $('#root').children().length;
    const questionsNums: Array<number> = [];
    let data = '';

    for (let i = 1; i <= limit; i++) {
      const child: number = this.randomizer(length, questionsNums);
      questionsNums.push(child);
      data += $(`#root > li:nth-child(${child})`).html();
    }

    return data;
  }

  private randomizer(length: number, arr: Array<number>) {
    const randomNumber: number = Math.floor(Math.random() * length) + 1;
    if (arr.includes(randomNumber)) {
      this.randomizer(length, arr);
    }
    return randomNumber;
  }
}
