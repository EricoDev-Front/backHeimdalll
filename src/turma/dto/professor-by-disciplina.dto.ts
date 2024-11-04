import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Periodo } from '../entities/turma.entity';
import { Professor } from 'src/professor/entities/professor.entity';

export class ProfessoresByDisciplinaDto {
  @ApiProperty({ description: 'ID da Turma' })
  @IsNumber()
  @IsNotEmpty()
  turma_id: number;

  @ApiProperty({ description: 'Professor associado à turma' })
  @IsNumber()
  @IsNotEmpty()
  professores: Professor[];
}
