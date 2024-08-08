import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { Role, RoleType } from 'src/roles/roles.model';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User)
    private usersTable: typeof User,
    private roleService: RolesService,
  ) { }

  async createUser(userDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 12);
    const newUser = await this.usersTable.create({
      ...userDto,
      password: hashedPassword,
    });

    // Add role
    const role = await this.roleService.getRole(RoleType.user);
    await newUser.$set('roles', [role.id]);
    // Reload with roles
    const newUserWithRoles = await this.usersTable.findByPk(newUser.id, {
      include: {
        model: Role,
        through: { attributes: [] },
      },
    })

    return newUserWithRoles;
  }

  async getAllUsers() {
    const users = await this.usersTable.findAll({
      include: {
        model: Role,
        through: { attributes: [] },
      },
    });

    return users;
  }

  async getUserById(id: number) {
    const user = await this.usersTable.findOne({
      where: { id },
      include: {
        model: Role,
        through: { attributes: [] },
      },
    });

    if (!user) {
      throw new BadRequestException({ message: 'User not found!' });
    }

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersTable.findOne({
      where: { email },
      include: {
        model: Role,
        through: { attributes: [] },
      },
    });

    return user;
  }

  // TODO:
  async updateUser() {

  }
}
