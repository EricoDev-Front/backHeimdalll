import { Module } from '@nestjs/common';
import { InteresseService } from './interesse.service';
import { InteresseController } from './interesse.controller';
import { Interesse } from './entities/interesse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InteresseRepository } from './interesse.repository';
import { AlunoRepository } from 'src/aluno/aluno.repository';
import { TurmaRepository } from 'src/turma/turma.repository';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Turma } from 'src/turma/entities/turma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interesse,Aluno,Turma])],
  controllers: [InteresseController],
  providers: [InteresseService, InteresseRepository, AlunoRepository, TurmaRepository],
})
export class InteresseModule {}
