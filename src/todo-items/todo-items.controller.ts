import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';

@Controller('todo-items')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @Post()
  create(@Body() createTodoItemDto: CreateTodoItemDto) {
    createTodoItemDto.owner = 1; // JWT: Should be used according to authorised user
    return this.todoItemsService.create(createTodoItemDto);
  }

  @Get()
  findAll() {
    return this.todoItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todoItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoItemDto: UpdateTodoItemDto,
  ) {
    updateTodoItemDto.owner = 1; // JWT: Should be used from jwt once implemented
    return this.todoItemsService.update(+id, updateTodoItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    // NOTE: better implement DeletedAt column logic, for data insights.
    const owner_id = 1; // JWT: Should be set through auth
    return this.todoItemsService.remove(+id, owner_id);
  }
}