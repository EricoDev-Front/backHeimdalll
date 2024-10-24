import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTurmaDto {
  @ApiProperty({ description: 'ID do professor associado à turma' })
  @IsNumber()
  @IsNotEmpty()
  professor_id: number;

  @ApiProperty({ description: 'ID do aluno associado à turma' })
  @IsNumber()
  @IsNotEmpty()
  aluno_id: number;

  @ApiProperty({ description: 'ID da disciplina associada à turma' })
  @IsNumber()
  @IsNotEmpty()
  disciplina_id: number;

  @ApiProperty({ description: 'Período da turma', type: Date })
  @IsNotEmpty()
  periodo: Date;
}
