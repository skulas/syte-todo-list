import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Req,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './users/entities/user.entity';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
@ApiTags('auth')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('test-auth')
  getCheckAuth(@Req() req: any): string {
    return `You are logged in as ${req.user.email}`;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOkResponse({ type: UserEntity })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('register')
  @ApiOkResponse({ type: UserEntity })
  async register(@Body() createTodoItemDto: CreateUserDto) {
    // There's a smart way to catch exceptions by filters in NestJS. Just a bit of an overkill for now.
    try {
      const newUser = await this.userService.create(createTodoItemDto);
      return newUser;
    } catch (e) {
      return { error: 'Your email is already in use' };
    }
  }
}
