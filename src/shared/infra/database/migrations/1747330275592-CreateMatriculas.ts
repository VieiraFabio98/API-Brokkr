import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateMatriculas1747330275592 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                        name: 'matriculas',
                        columns: [
                            {
                                name: "id",
                                type: "char",
                                length: "36",
                                isPrimary: true,
                                isGenerated: true,
                                generationStrategy: "uuid",
                            },
                            {
                                name: "aluno_id",
                                type: "varchar",
                                isNullable: false,
                            },
                            {
                                name: "curso_id",
                                type: "varchar",
                                isNullable: false,
                            },
                            {
                                name: "data_matricula",
                                type: "timestamp",
                                default: 'now()'
                            },
                            {
                                name: 'updated_at',
                                type: 'timestamp',
                                default: 'now()'
                            }
                        ],
                        foreignKeys: [
                            {
                                columnNames: ["aluno_id"],
                                referencedTableName: "alunos",
                                referencedColumnNames: ["id"],
                                onDelete: "CASCADE", 
                                onUpdate: "CASCADE"
                            },
                            {
                                columnNames: ["curso_id"],
                                referencedTableName: "cursos",
                                referencedColumnNames: ["id"],
                                onDelete: "CASCADE",
                                onUpdate: "CASCADE"
                            }
                        ]
                    })
                )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('matriculas')
    }

}
