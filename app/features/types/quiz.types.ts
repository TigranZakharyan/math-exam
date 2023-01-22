export type Answer = {
    id: number;
    title: string;
    isCorrect: boolean;
    createdAt: Date;
    updatedAt: string;
}

export type Question = {
    id: number;
    title: string;
    answers: Array<Answer>;
    createdAt: Date;
    updatedAt: string;
}

export type Quiz = {
    id: number;
    title: string;
    category: string;
    questions: Array<Question>;
    createdAt: Date;
    updatedAt: Date;
}
