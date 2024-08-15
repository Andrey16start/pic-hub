import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RoleType } from 'src/roles/roles.model';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';


@ApiTags('User')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(RoleType.admin)
  @UseGuards(RolesGuard)
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({ status: 200, type: User })
  @Roles(RoleType.admin)
  @UseGuards(RolesGuard)
  @Get(':id')
  getOne(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Add role' })
  @ApiResponse({ status: 200, type: User })
  @Roles(RoleType.admin)
  @UseGuards(RolesGuard)
  @Put('/add-role')
  addRole(@Body() addRoleDto: AddRoleDto): Promise<User> {
    return this.usersService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: 'Remove role' })
  @ApiResponse({ status: 200, type: User })
  @Roles(RoleType.admin)
  @UseGuards(RolesGuard)
  @Put('/remove-role')
  removeRole(@Body() removeRoleDto: AddRoleDto): Promise<User> {
    return this.usersService.removeRole(removeRoleDto);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200, type: User })
  @Roles(RoleType.admin)
  @UseGuards(RolesGuard)
  @Put('/ban')
  banUser(@Body() banUserDto: BanUserDto): Promise<User> {
    return this.usersService.banUser(banUserDto);
  }

  @ApiOperation({ summary: 'Unban user' })
  @ApiResponse({ status: 200, type: User })
  @Roles(RoleType.admin)
  @UseGuards(RolesGuard)
  @Put('/unban/:user_id')
  unbanUser(@Param('user_id') userId: number): Promise<User> {
    return this.usersService.unbanUser(userId);
  }
}
