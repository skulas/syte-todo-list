import { Module } from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';
import { TodoItemsController } from './todo-items.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TodoItemsController],
  providers: [TodoItemsService],
  imports: [PrismaModule],
})
export class TodoItemsModule {}
