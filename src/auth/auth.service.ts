import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersSvc: UsersService, private jwt: JwtService) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    // TODO: find a way to create a UserEntitythe out of findOne response, without all this boilerplate:
    const user = await this.usersSvc.findOne(email);
    if (user) {
      const uEntity = new UserEntity();
      uEntity.email = email;
      uEntity.password = user.password;
      uEntity.id = user.id;
      if (uEntity.validatePassword(password)) {
        return uEntity;
      }
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
