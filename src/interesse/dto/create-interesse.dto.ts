// create-interesse.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInteresseDto {
  @ApiProperty({ description: 'ID do aluno associado ao interesse' })
  @IsString()
  @IsNotEmpty()
  aluno_id: string;

  @ApiProperty({ description: 'ID da turma associada ao interesse' })
  @IsString()
  @IsNotEmpty()
  turma_id: string;
}
