// src/sala/sala.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaService } from './sala.service';
import { SalaController } from './sala.controller';
import { SalaRepository } from './sala.repository';
import { Sala } from './entities/sala.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sala]),
    forwardRef(() => AuthModule), // Importa AuthModule com forwardRef
  ],
  controllers: [SalaController],
  providers: [SalaService, SalaRepository],
  exports: [SalaService, SalaRepository], // Exporta o serviço e repositório, se necessário
})
export class SalaModule {}
