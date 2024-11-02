// src/validacao/validacao.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidacaoService } from './validacao.service';
import { ValidacaoController } from './validacao.controller';
import { Validacao } from './entities/validacao.entity';
import { ValidacaoRepository } from './validacao.repository';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Validacao, Reserva]),
    forwardRef(() => AuthModule), // Adiciona as entidades necessárias
  ],
  controllers: [ValidacaoController],
  providers: [ValidacaoService, ValidacaoRepository],
})
export class ValidacaoModule {}
