import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCursos1747330268087 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                        name: 'cursos',
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
                                name: "nome",
                                type: "varchar",
                                isNullable: false,
                            },
                            {
                                name: "descricao",
                                type: "varchar",
                                isNullable: false,
                            },
                            {
                                name: 'created_at',
                                type: 'timestamp',
                                default: 'now()'
                            },
                            {
                                name: 'updated_at',
                                type: 'timestamp',
                                default: 'now()'
                            }
                        ]
                    })
                )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cursos')
    }

}
