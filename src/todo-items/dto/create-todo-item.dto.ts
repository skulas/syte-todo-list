import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoItemDto {
  @ApiProperty({ required: false, default: false })
  done?: boolean = false;

  @ApiProperty()
  name: string;

  owner: number;
}
