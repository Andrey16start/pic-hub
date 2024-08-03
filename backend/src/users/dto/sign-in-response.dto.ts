import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users.model";


export class SignInResponseDto {
  @ApiProperty({ type: User })
  readonly user: User;

  @ApiProperty({ example: 'jwt token' })
  readonly token: string;
}