import { Professor } from 'src/professor/entities/professor.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Sala } from 'src/sala/entities/sala.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Validacao {
  @PrimaryGeneratedColumn()
  valida_id: number;

  @ManyToOne(() => Professor, (professor) => professor.professor_id, { onDelete: 'CASCADE' })
  professor: Professor;  // Mude de professor_id para professor

  @ManyToOne(() => Sala, (sala) => sala.sala_id, { onDelete: 'CASCADE' })
  sala: Sala;  // Mude de sala_id para sala

  @ManyToOne(() => Reserva, (reserva) => reserva.reserva_id, { onDelete: 'CASCADE' })
  reserva: Reserva;  // Mude de reserva_id para reserva

  @Column()
  status: boolean;

  @Column('time') // Armazena apenas o horário
  hora_inicio: string;

  @Column('time')
  hora_final: string;

  @Column('simple-array') // Armazena os dias reservados como um array de strings
  dias_reservados: string[];
}
