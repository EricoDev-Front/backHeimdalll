import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';
import { Professor } from 'src/professor/entities/professor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


export enum Periodo {
  MATUTINO = 'matutino',
  VESPERTINO = 'vespertino',
  NOTURNO = 'noturno',
}
@Entity()
export class Turma {
  @PrimaryGeneratedColumn() // Gera automaticamente um ID numérico
  turma_id: number;

  @ManyToOne(() => Professor, (professor) => professor.professor_id, { onDelete: 'CASCADE' })
  professor: Professor;

  @ManyToOne(() => Aluno, (aluno) => aluno.aluno_id, { onDelete: 'CASCADE' })
  aluno: Aluno;

  @ManyToOne(() => Disciplina, (disciplina) => disciplina.disciplina_id, { onDelete: 'CASCADE' })
  disciplina: Disciplina;

  @Column({
    type: 'enum',
    enum: Periodo,
  })
  periodo: Periodo;
}



