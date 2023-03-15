import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TodoItemsModule } from './todo-items/todo-items.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [AuthModule, PrismaModule, TodoItemsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
