import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDto {
  @ApiProperty({ description: 'ID do professor associado à reserva' })
  @IsNumber()
  @IsNotEmpty()
  professor_id: number;

  @ApiProperty({ description: 'ID da sala associada à reserva' })
  @IsNumber()
  @IsNotEmpty()
  sala_id: number;

  @ApiProperty({ description: 'ID da turma associada à reserva' })
  @IsNumber()
  @IsNotEmpty()
  turma_id: number;

  @ApiProperty({ description: 'Data de início do intervalo', example: '2024-11-01' })
  @IsString()
  @IsNotEmpty()
  dataInicio: string; // Data de início do intervalo (formato 'YYYY-MM-DD')

  @ApiProperty({ description: 'Data de fim do intervalo', example: '2024-11-03' })
  @IsString()
  @IsNotEmpty()
  dataFim: string; // Data de fim do intervalo (formato 'YYYY-MM-DD')

  @ApiProperty({ description: 'Horário de início', example: '18:00' })
  @IsString()
  @IsNotEmpty()
  horaInicio: string; // Horário de início (formato 'HH:mm')

  @ApiProperty({ description: 'Horário de fim', example: '19:00' })
  @IsString()
  @IsNotEmpty()
  horaFim: string; // Horário de fim (formato 'HH:mm')
}
