import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';
import { Professor } from 'src/professor/entities/professor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';


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

  @ManyToMany(() => Aluno, (aluno) => aluno.turmas, { onDelete: 'CASCADE' })
  @JoinTable() // Necessário para uma relação ManyToMany
  alunos: Aluno[]; // Mude aqui para ser uma lista de Alunos

  @ManyToOne(() => Disciplina, (disciplina) => disciplina.disciplina_id, { onDelete: 'CASCADE' })
  disciplina: Disciplina;

  @Column({
    type: 'enum',
    enum: Periodo,
  })
  periodo: Periodo;
}



