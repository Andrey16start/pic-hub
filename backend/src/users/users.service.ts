import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User)
    private userTable: typeof User,
  ) { }

  async createUser(dto: CreateUserDto) {
    const newUser = await this.userTable.create(dto);

    return newUser;
  }

  async getAllUsers() {
    const users = await this.userTable.findAll();

    return users;
  }

  async getUser(id: number) {
    const user = await this.userTable.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  // TODO:
  async updateUser() {

  }
}
