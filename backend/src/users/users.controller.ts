import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RoleType } from 'src/roles/roles.model';
import { RolesGuard } from 'src/auth/roles.guard';


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
}
