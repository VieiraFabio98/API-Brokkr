import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('alunos')
class Aluno {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("varchar", { name: "nome", nullable: false })
  nome: string

  @Column("varchar", { name: "email", nullable: false })
  email: string

  @Column("date", { name: "data_nascimento", nullable: false })
  dataNascimento: Date

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date
  
  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date
}

export { Aluno }