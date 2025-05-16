

import { Aluno } from "@modules/pessoas/infra/entities/aluno";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Curso } from "./curso";


@Entity('matriculas')
class Matricula {
  @PrimaryGeneratedColumn("uuid")
    id: string
  
    @ManyToOne(() => Aluno, { nullable: false, eager: true })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    alunoId: string
  
    @ManyToOne(() => Curso, { nullable: false, eager: true })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    cursoId: string
  
    @CreateDateColumn({ name: "data_matricula", nullable: false })
    dataNascimento: Date
    
    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date

}

export { Matricula }