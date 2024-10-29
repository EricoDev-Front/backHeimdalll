// auth/admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user; // O usuário é definido no guard de autenticação

        if (user && user.adm) { // Verifica se o usuário é um admin
            return true;
        }

        throw new ForbiddenException('Acesso negado. Somente administradores podem acessar esta rota.');
    }
}
