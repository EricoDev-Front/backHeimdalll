import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Turma } from 'src/turma/entities/turma.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Interesse {
  @PrimaryGeneratedColumn() // ID gerado automaticamente como numérico
  interesse_id: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.aluno_id)
  aluno: Aluno;

  @ManyToOne(() => Turma, (turma) => turma.turma_id)
  turma: Turma;
}
