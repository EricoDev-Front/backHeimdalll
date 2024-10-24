import { Module } from '@nestjs/common';
import { ValidacaoService } from './validacao.service';
import { ValidacaoController } from './validacao.controller';
import { Validacao } from './entities/validacao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidacaoRepository } from './validacao.repository';
import { Reserva } from 'src/reserva/entities/reserva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Validacao, Reserva])],
  controllers: [ValidacaoController],
  providers: [ValidacaoService, ValidacaoRepository],
})
export class ValidacaoModule {}
