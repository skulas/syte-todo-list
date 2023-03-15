import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends PartialType(CreateUserDto) {
  id: number;
}
