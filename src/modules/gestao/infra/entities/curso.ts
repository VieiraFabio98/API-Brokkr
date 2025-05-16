import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('cursos')
class Curso {
  @PrimaryGeneratedColumn("uuid")
    id: string
  
    @Column("varchar", { name: "nome", nullable: false })
    nome: string
  
    @Column("varchar", { name: "descricao", nullable: false })
    descricao: string
  
    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date
    
    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date

}

export { Curso }