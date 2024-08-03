import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";


interface RoleCreationAttrs {
  type: string;
  description: string;
}

export enum RoleType {
  user = "user",
  admin = "admin",
}
const allRoleTypes = Object.values(RoleType);

// TODO: find out solution how to correct typing it
export const API_DOCS_ROLE_EXAMPLE = {
  id: 1,
  type: RoleType.user,
  description: 'User role',
}


@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: RoleType.user })
  @Column({ type: DataType.ENUM(...allRoleTypes), unique: true, allowNull: false })
  type: string;

  @ApiProperty({ example: 'Administrator' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}