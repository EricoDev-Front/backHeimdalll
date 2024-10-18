// create-sala.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateSalaDto {
  @ApiProperty({ description: 'Status da sala' })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ description: 'Identificador da sala' })
  @IsString()
  @IsNotEmpty()
  ident_sala: string;

  @ApiProperty({ description: 'Número de cadeiras', required: false })
  @IsOptional()
  @IsInt()
  num_cadeiras?: number;

  @ApiProperty({ description: 'Número de mesas', required: false })
  @IsOptional()
  @IsInt()
  num_mesas?: number;

  @ApiProperty({ description: 'Número de projetores', required: false })
  @IsOptional()
  @IsInt()
  num_projetores?: number;

  @ApiProperty({ description: 'Número de computadores', required: false })
  @IsOptional()
  @IsInt()
  num_computadores?: number;

  @ApiProperty({ description: 'Número de lousas', required: false })
  @IsOptional()
  @IsInt()
  num_lousas?: number;
}
