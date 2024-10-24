import { Module } from '@nestjs/common';
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

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Turma, Professor, Sala, Validacao])],
  controllers: [ReservaController],
  providers: [ReservaService, ReservaRepository, TurmaRepository],
})
export class ReservaModule {}
