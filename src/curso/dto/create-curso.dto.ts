// create-curso.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCursoDto {
  @ApiProperty({ description: 'Nome do curso' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Descrição do curso', required: false })
  @IsOptional()
  @IsString()
  descricao?: string;
}
