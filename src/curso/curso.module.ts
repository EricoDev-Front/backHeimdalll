import { forwardRef, Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { CursoRepository } from './curso.repository';
import { Curso } from './entities/curso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Curso]),
  forwardRef(() => AuthModule),
],
  controllers: [CursoController],
  providers: [CursoService, CursoRepository],
})
export class CursoModule {}
