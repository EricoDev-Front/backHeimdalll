import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservaDto {
  @ApiProperty({ description: 'ID da reserva', required: true })
  @IsNumber()
  reserva_id: number;

  @ApiProperty({ description: 'ID do professor associado à reserva', required: false })
  @IsOptional()
  @IsNumber()
  professor_id?: number;

  @ApiProperty({ description: 'ID da sala associada à reserva', required: false })
  @IsOptional()
  @IsNumber()
  sala_id?: number;

  @ApiProperty({ description: 'ID da turma associada à reserva', required: false })
  @IsOptional()
  @IsNumber()
  turma_id?: number;

  @ApiProperty({ description: 'Status da reserva', required: false })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiProperty({ description: 'Data de início do intervalo', example: '2024-11-01', required: false })
  @IsOptional()
  @IsDateString()
  dataInicio?: string; // Data de início do intervalo (formato 'YYYY-MM-DD')

  @ApiProperty({ description: 'Data de fim do intervalo', example: '2024-11-03', required: false })
  @IsOptional()
  @IsDateString()
  dataFim?: string; // Data de fim do intervalo (formato 'YYYY-MM-DD')

  @ApiProperty({ description: 'Horário de início', example: '18:00', required: false })
  @IsOptional()
  @IsString()
  horaInicio?: string; // Horário de início (formato 'HH:mm')

  @ApiProperty({ description: 'Horário de fim', example: '19:00', required: false })
  @IsOptional()
  @IsString()
  horaFim?: string; // Horário de fim (formato 'HH:mm')
}
