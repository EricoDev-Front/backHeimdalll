import { forwardRef, Module } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';
import { TurmaRepository } from './turma.repository';
import { Turma } from './entities/turma.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Professor } from 'src/professor/entities/professor.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';
import { Aluno } from 'src/aluno/entities/aluno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Turma, Professor, Disciplina, Aluno]),
  forwardRef(() => AuthModule),
],
  controllers: [TurmaController],
  providers: [TurmaService, TurmaRepository],
})
export class TurmaModule {}
