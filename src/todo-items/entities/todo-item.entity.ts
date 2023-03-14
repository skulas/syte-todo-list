import { TodoItem } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TodoItemEntity implements TodoItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: false })
  done: boolean | false;

  owner_id: number;
}
