// create-disciplina.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDisciplinaDto {
  @ApiProperty({ description: 'ID da disciplina' })
  @IsString()
  @IsNotEmpty()
  disciplina_id: string;

  @ApiProperty({ description: 'Nome da disciplina' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Descrição da disciplina', required: false })
  @IsOptional()
  @IsString()
  descricao?: string;
}
