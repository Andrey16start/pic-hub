import { ApiProperty } from "@nestjs/swagger";

import { RoleType } from "src/roles/roles.model";


export class AddRoleDto {
  @ApiProperty({ example: RoleType.user })
  readonly roleType: RoleType;

  @ApiProperty({ example: 1 })
  readonly userId: number;
}