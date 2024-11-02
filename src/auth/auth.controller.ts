// src/auth/auth.controller.ts

import { Controller, Post, Body, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.senha,
      );

      const loginResponse = await this.authService.login(user);
      return loginResponse;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          error: 'Email ou senha incorretos',
        }, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Erro interno no servidor',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
