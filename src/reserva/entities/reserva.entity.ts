import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Professor } from 'src/professor/entities/professor.entity';
import { Sala } from 'src/sala/entities/sala.entity';
import { Turma } from 'src/turma/entities/turma.entity';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  reserva_id: number;

  @ManyToOne(() => Professor, (professor) => professor.professor_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'professor_id' }) // Define explicitamente o nome da coluna
  professor: Professor;

  @ManyToOne(() => Sala, (sala) => sala.sala_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sala_id' }) // Define explicitamente o nome da coluna
  sala: Sala;

  @ManyToOne(() => Turma, (turma) => turma.turma_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'turma_id' }) // Define explicitamente o nome da coluna
  turma: Turma;

  @Column()
  status: boolean;

  @Column()
  data_hora_inicio: Date;

  @Column()
  data_hora_final: Date;
}
