import { forwardRef, Module } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaController } from './disciplina.controller';
import { DisciplinaRepository } from './disciplina.repository';
import { Disciplina } from './entities/disciplina.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Disciplina]),
  forwardRef(() => AuthModule),
],
  controllers: [DisciplinaController],
  providers: [DisciplinaService, DisciplinaRepository],
})
export class DisciplinaModule {}
