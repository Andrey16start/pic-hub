import { Column, DataType, Model, Table } from "sequelize-typescript";

import { Nullable } from "common/types/common.types";
import { ApiProperty } from "@nestjs/swagger";


interface UserCreationAttrs {
  email: string;
  password: string;
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
}