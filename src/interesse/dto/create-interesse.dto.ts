import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInteresseDto {
  @ApiProperty({ description: 'ID do aluno associado ao interesse' })
  @IsNumber()
  @IsNotEmpty()
  aluno_id: number;

  @ApiProperty({ description: 'ID da turma associada ao interesse' })
  @IsNumber()
  @IsNotEmpty()
  turma_id: number;
}
