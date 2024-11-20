import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suporte } from './entities/suporte.entity';
import { SuporteService } from './suporte.service';
import { SuporteController } from './suporte.controller';
import { SuporteRepository } from './suporte.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Suporte])],
  controllers: [SuporteController],
  providers: [SuporteService, SuporteRepository],
  exports: [SuporteService, SuporteRepository],
})
export class SuporteModule {}
