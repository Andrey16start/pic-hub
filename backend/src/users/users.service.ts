import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { Role, RoleType } from 'src/roles/roles.model';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';


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

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.usersTable.findByPk(addRoleDto.userId, {
      include: {
        model: Role,
        through: { attributes: [] },
      },
    });
    // TODO: validate enum roleType
    const role = await this.roleService.getRole(addRoleDto.roleType);

    if (!user || !role) {
      const messageEntity = user ? 'Role' : 'User';

      throw new NotFoundException({ message: `${messageEntity} with given id doesn't exist` });
    }
    else if (user.roles.find(r => r.type === addRoleDto.roleType)) {
      throw new BadRequestException({ message: 'User already has given role' });
    }

    await user.$add('role', role.id);

    // Add role for response
    user.roles.push(role);

    return user;
  }

  async removeRole(removeRoleDto: AddRoleDto) {
    const user = await this.usersTable.findByPk(removeRoleDto.userId, {
      include: {
        model: Role,
        through: { attributes: [] },
      },
    });
    const indexOfRole = user.roles.findIndex(r => r.type === removeRoleDto.roleType);
    // TODO: validate enum roleType
    const role = await this.roleService.getRole(removeRoleDto.roleType);

    if (!user || !role) {
      const messageEntity = user ? 'Role' : 'User';

      throw new NotFoundException({ message: `${messageEntity} with given id doesn't exist` });
    }
    else if (indexOfRole === -1) {
      throw new BadRequestException({ message: 'User does\'nt have given role' });
    }

    await user.$remove('role', role.id);

    // Remove role for response
    user.roles.splice(indexOfRole, 1);

    return user;
  }

  async banUser(banUserDto: BanUserDto) {
    const user = await this.usersTable.findByPk(banUserDto.userId);

    if (!user) {
      throw new NotFoundException({ message: `User with given id doesn't exist` });
    }
    if (user.isBanned) {
      throw new BadRequestException({ message: 'User already banned' });
    }
    user.isBanned = true;
    user.banReason = banUserDto.banReason;

    await user.save();

    return user;
  }

  async unbanUser(userId: number) {
    const user = await this.usersTable.findByPk(userId);

    if (!user) {
      throw new NotFoundException({ message: `User with given id doesn't exist` });
    }
    if (!user.isBanned) {
      throw new BadRequestException({ message: 'User already unbanned' });
    }
    user.isBanned = false;
    user.banReason = null;

    await user.save();

    return user;
  }

  // TODO:
  async updateUser() {

  }
}
