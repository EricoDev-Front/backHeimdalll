import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateDisciplinaDto {
  @ApiProperty({ description: 'Nome da disciplina' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Descrição da disciplina', required: false })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ description: 'ID do curso associado à disciplina' })
  @IsNotEmpty()
  @IsNumber()
  curso_id: number;  // Adiciona o campo para o ID do Curso
}
