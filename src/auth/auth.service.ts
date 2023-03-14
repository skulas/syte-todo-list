import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  getUser(email: string) {
    const user = this.prisma.user.findFirst({
      where: { email: { equals: email } },
      select: { password: true },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
