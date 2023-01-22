import { ApiProperty } from '@nestjs/swagger';

export class DeleteManyBooksDto {
    @ApiProperty()
    ids: Array<number>;
}
