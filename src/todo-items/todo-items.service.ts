import { Injectable } from '@nestjs/common';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoItemsService {
  constructor(private prisma: PrismaService) {}

  create(createTodoItemDto: CreateTodoItemDto) {
    return this.prisma.todoItem.create({
      data: {
        owner_id: createTodoItemDto.owner,
        name: createTodoItemDto.name,
        done: createTodoItemDto.done,
      },
    });
  }

  findAll() {
    // return this.prisma.todoItem.findMany({ where: { published: true } });
    return this.prisma.todoItem.findMany();
  }

  findOne(id: number) {
    return this.prisma.todoItem.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateTodoItemDto: UpdateTodoItemDto) {
    const data = { done: updateTodoItemDto.done };
    if (updateTodoItemDto.name) {
      data['name'] = updateTodoItemDto.name;
    }
    return this.prisma.todoItem.updateMany({
      where: {
        id: id,
        owner_id: updateTodoItemDto.owner,
      },
      data: data,
    });
  }

  remove(id: number, owner_id: number) {
    return this.prisma.todoItem.deleteMany({
      where: {
        id: id,
        owner_id: owner_id,
      },
    })
  }
}
