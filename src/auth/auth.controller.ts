// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; // Defina seu DTO para Login
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'Login bem-sucedido' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.senha,
      loginDto.userType,
    );

    const loginResponse = await this.authService.login(user, loginDto.userType);

    return {
      ...loginResponse,
      isAdm: 'adm' in user ? user.adm : false, // Verifica se é um Professor
    };
  }
}
