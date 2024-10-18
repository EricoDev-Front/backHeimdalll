// create-turma.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTurmaDto {
  @ApiProperty({ description: 'ID do professor associado à turma' })
  @IsString()
  @IsNotEmpty()
  professor_id: number;

  @ApiProperty({ description: 'ID do aluno associado à turma' })
  @IsString()
  @IsNotEmpty()
  aluno_id: number;

  @ApiProperty({ description: 'ID da disciplina associada à turma' })
  @IsString()
  @IsNotEmpty()
  disciplina_id: number;

  @ApiProperty({ description: 'Período da turma', type: Date })
  @IsNotEmpty()
  periodo: Date;
}
