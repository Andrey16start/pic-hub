import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Role, RoleType } from './roles.model';
import { CreateRoleDto } from './dto/create-role.cto';


@Injectable()
export class RolesService {

  constructor(
    @InjectModel(Role)
    private rolesTable: typeof Role,
  ) { }

  async createRole(dto: CreateRoleDto) {
    const newRole = await this.rolesTable.create(dto);

    return newRole;
  }

  async getAllRoles() {
    const roles = await this.rolesTable.findAll();

    return roles;
  }

  async getRole(type: RoleType) {
    const role = await this.rolesTable.findOne({ where: { type } });

    return role;
  }
}
