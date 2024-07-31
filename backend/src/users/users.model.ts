import { Column, DataType, Model, Table } from "sequelize-typescript";

import { Nullable } from "common/types/common.types";


interface UserCreationAttrs {
  email: string;
  password: string;
}


@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBanned: boolean;

  @Column({ type: DataType.STRING })
  banReason: Nullable<string>;
}