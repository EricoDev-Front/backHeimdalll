import { forwardRef, Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { ReservaRepository } from './reserva.repository';
import { Reserva } from './entities/reserva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turma } from 'src/turma/entities/turma.entity';
import { TurmaRepository } from 'src/turma/turma.repository';
import { Professor } from 'src/professor/entities/professor.entity';
import { Sala } from 'src/sala/entities/sala.entity';
import { Validacao } from 'src/validacao/entities/validacao.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';
import { MailModule } from 'src/mail/mail.module';
import { AlunoRepository } from 'src/aluno/aluno.repository';
import { AlunoModule } from 'src/aluno/aluno.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Turma, Professor, Sala, Validacao, Aluno, Disciplina]),
  MailModule,
  AlunoModule,
  forwardRef(() => AuthModule),
],
  controllers: [ReservaController],
  providers: [ReservaService, ReservaRepository, TurmaRepository, AlunoRepository],
})
export class ReservaModule {}
