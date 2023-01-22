import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  private questionsFile = 'questions.html';

  private readFile(file: string) {
    try {
      const filename = path.resolve(__dirname, '../', '../assets', file);
      return fs.readFileSync(filename, 'utf8');
    } catch (err) {
      throw err;
    }
  }

  parseQuestionsHTML() {
    const data = this.readFile(this.questionsFile);
    return cheerio.load(data);
  }
}
