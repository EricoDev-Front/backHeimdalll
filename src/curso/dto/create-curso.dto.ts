// create-curso.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCursoDto {
  @ApiProperty({ description: 'ID do curso' })
  @IsString()
  @IsNotEmpty()
  curso_id: string;

  @ApiProperty({ description: 'Nome do curso' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Descrição do curso', required: false })
  @IsOptional()
  @IsString()
  descricao?: string;
}
