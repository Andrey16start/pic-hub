import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

import { Nullable } from "common/types/common.types";
import { API_DOCS_ROLE_EXAMPLE, Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";


interface UserCreationAttrs {
  email: string;
  password: string;
}

// TODO: find out solution how to correct typing it
export const API_DOCS_USER_EXAMPLE = {
  id: 1,
  email: 'user@gmail.com',
  password: '12345678',
  isBanned: false,
  banReason: null,
  roles: [API_DOCS_ROLE_EXAMPLE],
}


@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'user@gmail.com' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345678' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: false })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBanned: boolean;

  @ApiProperty({ example: null, default: null })
  @Column({ type: DataType.STRING })
  banReason: Nullable<string>;

  @ApiProperty({ example: [API_DOCS_ROLE_EXAMPLE] })
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}