import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

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

  async createUser(dto: CreateUserDto) {
    const newUser = await this.usersTable.create(dto);

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
