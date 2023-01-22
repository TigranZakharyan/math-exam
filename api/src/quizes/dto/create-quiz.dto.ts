import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


class Answer {
    @ApiProperty()
    title: string;

    @ApiProperty()
    isCorrect: boolean;
}

class Question {
    @ApiProperty()
    title: string;

    @ApiProperty({ isArray: true, type: Answer })
    @IsNotEmpty()
    answers: Answer[]
}

export class CreateQuizDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    category: string;

    @ApiProperty({ isArray: true, type: Question })
    @IsNotEmpty()
    questions: Question[];

    @ApiProperty()
    @IsNotEmpty()
    description: string;
}
