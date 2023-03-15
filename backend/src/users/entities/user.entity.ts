import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  validatePassword(password: string) {
    // Would be useful to MD5 (or other hash) the password prior saving it to db, thus this method would need to hash it again.
    // For this example we are not hasing the pwd
    return password === this.password;
  }

  /* Hashing the password
  async setPassword(password: string) {
    this.password = await hash(password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
  */
}
