// src/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ProfessorModule } from '../professor/professor.module';
import { AlunoModule } from '../aluno/aluno.module';
import { Curso } from 'src/curso/entities/curso.entity';
import { CursoModule } from 'src/curso/curso.module';
import { DisciplinaModule } from 'src/disciplina/disciplina.module';
import { InteresseModule } from 'src/interesse/interesse.module';
import { ReservaModule } from 'src/reserva/reserva.module';
import { SalaModule } from 'src/sala/sala.module';
import { TurmaModule } from 'src/turma/turma.module';
import { ValidacaoModule } from 'src/validacao/validacao.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'MeusProfessoresSaoOsMelhores',
      signOptions: { expiresIn: '1h',
        algorithm: 'HS256' // Algoritmo de assinatura JWT (HS256 por padrão)
      },
      
    }),
    forwardRef(() => ProfessorModule),
    forwardRef(() => AlunoModule),
    forwardRef(() => CursoModule),
    forwardRef(() => DisciplinaModule),
    forwardRef(() => InteresseModule),
    forwardRef(() => ReservaModule),
    forwardRef(() => SalaModule),
    forwardRef(() => TurmaModule),
    forwardRef(() => ValidacaoModule),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule, AuthService], // Exportando AuthService e JwtModule
})
export class AuthModule {}
