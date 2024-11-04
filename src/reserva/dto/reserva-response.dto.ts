import { ApiProperty } from '@nestjs/swagger';

export class ReservaResponseDto {
  @ApiProperty({ description: 'ID da reserva' })
  reserva_id: number;

  @ApiProperty({ description: 'ID do professor associado à reserva' })
  professor_id: number;

  @ApiProperty({ description: 'ID da sala associada à reserva' })
  sala_id: number;

  @ApiProperty({ description: 'ID da turma associada à reserva' })
  turma_id: number;

  @ApiProperty({ description: 'Status da reserva' })
  status: boolean;

  @ApiProperty({ description: 'Hora de início da reserva', type: String })
  hora_inicio: string; // Formato: 'HH:mm'

  @ApiProperty({ description: 'Hora de final da reserva', type: String })
  hora_final: string; // Formato: 'HH:mm'

  @ApiProperty({ description: 'Dias reservados em formato de array', type: [String] })
  dias_reservados: string[]; // Exemplo: ['2024-11-01', '2024-11-02']
}
