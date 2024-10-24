import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCursoDto {
  @ApiProperty({ description: 'Nome do curso' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Descrição do curso', required: false })
  @IsOptional()
  @IsString()
  descricao?: string;
}
