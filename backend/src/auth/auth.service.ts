import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInResponseDto } from 'src/users/dto/sign-in-response.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(userDto: CreateUserDto): Promise<SignInResponseDto> {
    const user = await this._validateUser(userDto);
    const token = await this._generateToken(user);

    return { user, token };
  }

  async signUp(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'User with that email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 12);
    const user = await this.userService.createUser({
      email: userDto.email,
      password: hashedPassword,
    });

    return user;
  }

  private async _generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    }

    return this.jwtService.sign(payload);
  }

  private async _validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Incorrect email or password',
    })
  }
}
