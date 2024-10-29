// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ProfessorService } from '../professor/professor.service'; 
import { AlunoService } from '../aluno/aluno.service'; 
import { ProfessorModule } from '../professor/professor.module'; 
import { AlunoModule } from '../aluno/aluno.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'MeusProfessoresSaoOsMelhores', // Chave secreta
      signOptions: { expiresIn: '1h' }, // Expiração de 1 hora
    }),
    ProfessorModule,
    AlunoModule,
  ],
  providers: [AuthService, JwtStrategy, ProfessorService, AlunoService],
  controllers: [AuthController],
})
export class AuthModule {}
