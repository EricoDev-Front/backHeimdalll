// create-aluno.dto.ts
import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlunoDto {
  @ApiProperty({ description: 'Nome do aluno' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Email do aluno' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Senha do aluno' })
  @IsString()
  @IsNotEmpty()
  senha: string;

  @ApiProperty({ description: 'Registro do aluno' })
  @IsString()
  @IsNotEmpty()
  registro: string;

  @ApiProperty({ description: 'Ano de entrada do aluno' })
  @IsInt()
  ano_entrada: number;
}
