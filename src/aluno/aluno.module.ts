// src/aluno/aluno.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { AlunoRepository } from './aluno.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aluno]),
    forwardRef(() => AuthModule),
  ],
  controllers: [AlunoController],
  providers: [AlunoService, AlunoRepository],
  exports: [AlunoService, AlunoRepository],
})
export class AlunoModule {}
