import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersService } from './users.service';
import { User } from './users.model';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
  ],
})
export class UsersModule { }
