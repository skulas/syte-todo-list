import { PartialType } from '@nestjs/swagger';
import { CreateTodoItemDto } from './create-todo-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoItemDto extends PartialType(CreateTodoItemDto) {
  @ApiProperty({ required: false, default: null })
  name: string;
}
