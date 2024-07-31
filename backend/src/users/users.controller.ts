import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';


@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @Post()
  create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<User> {
    return this.usersService.getUser(id);
  }
}
