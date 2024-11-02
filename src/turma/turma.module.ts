import { forwardRef, Module } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';
import { TurmaRepository } from './turma.repository';
import { Turma } from './entities/turma.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Turma]),
  forwardRef(() => AuthModule),
],
  controllers: [TurmaController],
  providers: [TurmaService, TurmaRepository],
})
export class TurmaModule {}
