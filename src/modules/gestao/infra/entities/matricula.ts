

import { Aluno } from "@modules/pessoas/infra/entities/aluno"
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Curso } from "./curso"


@Entity('matriculas')
class Matricula {
  @PrimaryGeneratedColumn("uuid")
    id: string
  
    @ManyToOne(() => Aluno, { nullable: false, eager: true })
    @JoinColumn({ name: 'aluno_id', referencedColumnName: 'id' })
    aluno: Aluno
  
    @ManyToOne(() => Curso, { nullable: false, eager: true })
    @JoinColumn({ name: 'curso_id', referencedColumnName: 'id' })
    curso: Curso
  
    @CreateDateColumn({ name: "data_matricula", type: "timestamp" })
    dataMatricula: Date
    
    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date

}

export { Matricula }