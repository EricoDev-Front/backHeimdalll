// src/auth/jwt.auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Captura o token do cabeçalho

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token); // Decodifica o token
      console.log('Token:', token); // Log do token para verificação
      console.log(this.jwtService.verifyAsync(token)); // Log do token para verificação
      console.log('Payload decodificado:', payload); // Log do payload para verificação
      request.user = payload; // Define os dados do usuário na requisição
      return true;
    } catch (e) {
      console.error('Erro ao verificar o token:', e); // Log do erro
      throw new UnauthorizedException('Token inválido');
    }
    
  }
}
