import { Controller, Get, Request, Post, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './users/entities/user.entity';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.auth.guard';

@Controller()
@ApiTags('auth')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
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
}
