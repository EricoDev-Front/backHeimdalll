// create-reserva.dto.ts
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDto {
  @ApiProperty({ description: 'ID do professor associado à reserva' })
  @IsString()
  @IsNotEmpty()
  professor_id: number;

  @ApiProperty({ description: 'ID da sala associada à reserva' })
  @IsString()
  @IsNotEmpty()
  sala_id: number;

  @ApiProperty({ description: 'Status da reserva' })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ description: 'Data e hora de início da reserva', type: Date })
  @IsNotEmpty()
  data_hora_inicio: Date;

  @ApiProperty({ description: 'Data e hora de final da reserva', type: Date })
  @IsNotEmpty()
  data_hora_final: Date;
}
