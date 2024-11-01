import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Professor } from 'src/professor/entities/professor.entity';
import { Sala } from 'src/sala/entities/sala.entity';
import { Turma } from 'src/turma/entities/turma.entity';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  reserva_id: number;

  @ManyToOne(() => Professor, (professor) => professor.professor_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;

  @ManyToOne(() => Sala, (sala) => sala.sala_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sala_id' })
  sala: Sala;

  @ManyToOne(() => Turma, (turma) => turma.turma_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'turma_id' })
  turma: Turma;

  @Column()
  status: boolean;

  @Column('time') // Armazena apenas o horário
  hora_inicio: string;

  @Column('time')
  hora_final: string;

  @Column('simple-array') // Armazena os dias reservados como um array de strings
  dias_reservados: string[];
}
