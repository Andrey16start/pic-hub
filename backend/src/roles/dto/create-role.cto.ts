import { ApiProperty } from "@nestjs/swagger";

import { RoleType } from "../roles.model";


export class CreateRoleDto {

  @ApiProperty({ example: RoleType.user, enum: RoleType })
  readonly type: RoleType;

  @ApiProperty({ example: 'Description for new Role' })
  readonly description: string;
}