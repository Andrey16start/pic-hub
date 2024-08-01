import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateRoleDto } from './dto/create-role.cto';
import { RolesService } from './roles.service';
import { Role, RoleType } from './roles.model';


@ApiTags('Role')
@Controller('roles')
export class RolesController {

  constructor(private roleService: RolesService) { }

  @ApiOperation({ summary: 'Create new role' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() roleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  getAll(): Promise<Role[]> {
    return this.roleService.getAllRoles();
  }

  @ApiOperation({ summary: 'Get one role by RoleType' })
  @ApiResponse({ status: 200, type: Role })
  @Get(':type')
  getOne(@Param('type') type: RoleType): Promise<Role> {
    return this.roleService.getRole(type);
  }
}
