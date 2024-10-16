// turma.entity.ts
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';
import { Professor } from 'src/professor/entities/professor.entity';
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Turma {
  @PrimaryColumn()
  turma_id: string;

  @ManyToOne(() => Professor, (professor) => professor.professor_id)
  professor_id: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.aluno_id)
  aluno_id: number;

  @ManyToOne(() => Disciplina, (disciplina) => disciplina.disciplina_id)
  disciplina_id: number;

  @Column()
  periodo: Date;
}
