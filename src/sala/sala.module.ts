import { Module } from '@nestjs/common';
import { SalaService } from './sala.service';
import { SalaController } from './sala.controller';
import { SalaRepository } from './sala.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sala } from './entities/sala.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sala])],
  controllers: [SalaController],
  providers: [SalaService, SalaRepository],
})
export class SalaModule {}
