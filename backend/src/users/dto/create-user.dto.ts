// FIXME:TODO: Why not UserCreationAttrs ? DRY

import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com' })
  readonly email: string;

  @ApiProperty({ example: '12345678' })
  readonly password: string;
}