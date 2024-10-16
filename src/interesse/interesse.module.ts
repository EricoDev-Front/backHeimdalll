import { Module } from '@nestjs/common';
import { InteresseService } from './interesse.service';
import { InteresseController } from './interesse.controller';
import { Interesse } from './entities/interesse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InteresseRepository } from './interesse.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Interesse])],
  controllers: [InteresseController],
  providers: [InteresseService, InteresseRepository],
})
export class InteresseModule {}
