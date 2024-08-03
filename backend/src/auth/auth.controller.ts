import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInResponseDto } from 'src/users/dto/sign-in-response.dto';

import { AuthService } from './auth.service';
import { User } from 'src/users/users.model';


@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: HttpStatus.OK, type: SignInResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, example: { message: 'Incorrect email or password' } })
  @Post('/sign-in')
  signIn(@Body() userDto: CreateUserDto) {
    return this.authService.signIn(userDto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, example: { message: 'User with that email already exist' } })
  @Post('/sign-up')
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }
}
