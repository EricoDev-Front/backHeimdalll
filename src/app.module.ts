import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalaModule } from './sala/sala.module';
import { ProfessorModule } from './professor/professor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sala } from './sala/entities/sala.entity';
import { Professor } from './professor/entities/professor.entity';
import { CursoModule } from './curso/curso.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { TurmaModule } from './turma/turma.module';
import { InteresseModule } from './interesse/interesse.module';
import { ReservaModule } from './reserva/reserva.module';
import { Curso } from './curso/entities/curso.entity';
import { Disciplina } from './disciplina/entities/disciplina.entity';
import { Turma } from './turma/entities/turma.entity';
import { Interesse } from './interesse/entities/interesse.entity';
import { Reserva } from './reserva/entities/reserva.entity';
import { ValidacaoModule } from './validacao/validacao.module';
import { Validacao } from './validacao/entities/validacao.entity';
import { AlunoModule } from './aluno/aluno.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'heimdalldb.mysql.database.azure.com',
      port: 3306,
      username: 'heimdall',
      password: 'Paladino123',
      database: 'heimdall',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SalaModule,
    ProfessorModule,
    CursoModule,
    DisciplinaModule,
    TurmaModule,
    InteresseModule,
    ReservaModule,
    ValidacaoModule,
    AlunoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
