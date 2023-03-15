import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TodoItemEntity } from './entities/todo-item.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('todo-items')
@ApiTags('todo-items')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: TodoItemEntity })
  create(@Body() createTodoItemDto: CreateTodoItemDto, @Req() req: any) {
    // Cast not needed, adding it for clarity.
    const user = <UserDto>req.user;
    createTodoItemDto.owner = user.id;
    return this.todoItemsService.create(createTodoItemDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TodoItemEntity, isArray: true })
  findAll(@Req() req: any) {
    const user = <UserDto>req.user;
    return this.todoItemsService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TodoItemEntity })
  // This API is not needed, just added it for practice and validation.
  findOne(@Param('id') id: number, @Req() req: any) {
    const user = <UserDto>req.user;
    return this.todoItemsService.findOne(+id, user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTodoItemDto: UpdateTodoItemDto,
    @Req() req: any,
  ) {
    updateTodoItemDto.owner = req.user.id;
    return this.todoItemsService.update(+id, updateTodoItemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number, @Req() req: any) {
    // NOTE: better implement DeletedAt column logic, for data insights.
    const owner_id = req.user.id;
    return this.todoItemsService.remove(+id, owner_id);
  }
}
