import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { AlunoRepository } from './aluno.repository';
import { Aluno } from './entities/aluno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno])],
  controllers: [AlunoController],
  providers: [AlunoService, AlunoRepository],
  exports: [TypeOrmModule],
})
export class AlunoModule {}
