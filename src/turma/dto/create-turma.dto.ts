import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Periodo } from '../entities/turma.entity';

export class CreateTurmaDto {
  @ApiProperty({ description: 'ID do professor associado à turma' })
  @IsNumber()
  @IsNotEmpty()
  professor_id: number;

  @ApiPropertyOptional({ description: 'Lista de IDs de alunos associados à turma (opcional)' })
  @IsArray()
  @IsOptional()
  aluno_ids?: number[];

  @ApiProperty({ description: 'ID da disciplina associada à turma' })
  @IsNumber()
  @IsNotEmpty()
  disciplina_id: number;

  @ApiProperty({ description: 'Período da turma', enum: Periodo })
  @IsNotEmpty()
  @IsEnum(Periodo, { message: 'O período deve ser um dos seguintes: matutino, vespertino, noturno.' })
  periodo: Periodo;
}
