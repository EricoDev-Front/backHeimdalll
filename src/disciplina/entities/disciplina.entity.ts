import { Curso } from 'src/curso/entities/curso.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Disciplina {
  @PrimaryGeneratedColumn() // ID numérico gerado automaticamente
  disciplina_id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao: string;

  @ManyToOne(() => Curso, curso => curso.disciplinas, { onDelete: 'CASCADE' })
  curso: Curso;
}
