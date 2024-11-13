import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Professor } from 'src/professor/entities/professor.entity';

export class ProfessoresByDisciplinaDto {
  @ApiProperty({ description: 'ID da Turma' })
  @IsNumber()
  @IsNotEmpty()
  turma_id: number;

  @ApiProperty({
    description:
      'Lista de professores associados à turma com seus respectivos períodos',
    type: [Object],
  })
  @IsNotEmpty()
  professores: Array<{ professor: Professor; periodo: string }>;
}
