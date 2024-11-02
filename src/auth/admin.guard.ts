// src/auth/admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.adm) { // Verifica se o usuário tem privilégio de administrador
      return true;
    }
    
    throw new ForbiddenException('Acesso negado. Somente administradores podem acessar esta rota.');
  }
}
