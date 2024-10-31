import { Turma } from 'src/turma/entities/turma.entity';
import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Aluno {
  @PrimaryGeneratedColumn() // ID gerado automaticamente
  aluno_id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  registro: string;

  @Column()
  ano_entrada: number;

  @ManyToMany(() => Turma, (turma) => turma.alunos)
  turmas: Turma[]; // Mude aqui para manter a relação
}
