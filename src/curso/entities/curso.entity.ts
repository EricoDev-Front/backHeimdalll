import { Disciplina } from '../../disciplina/entities/disciplina.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn() // ID gerado automaticamente
  curso_id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao: string;

  @OneToMany(() => Disciplina, disciplina => disciplina.curso)
  disciplinas: Disciplina[];
}
