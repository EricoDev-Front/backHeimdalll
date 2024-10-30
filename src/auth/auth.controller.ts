// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
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

    try{
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
      } catch (error) {
        // Captura a UnauthorizedException e retorna uma resposta com status 401
        if (error instanceof UnauthorizedException) {
          throw new HttpException({
            status: HttpStatus.UNAUTHORIZED,
            error: 'Email ou senha incorretos',
          }, HttpStatus.UNAUTHORIZED);
        }
        // Opcional: caso queira capturar outras exceções
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Erro interno no servidor',
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
