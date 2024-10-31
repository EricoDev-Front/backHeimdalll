import { Module } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaController } from './disciplina.controller';
import { DisciplinaRepository } from './disciplina.repository';
import { Disciplina } from './entities/disciplina.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from 'src/curso/entities/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disciplina, Curso])],
  controllers: [DisciplinaController],
  providers: [DisciplinaService, DisciplinaRepository],
})
export class DisciplinaModule {}
