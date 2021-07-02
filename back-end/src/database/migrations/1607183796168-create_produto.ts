import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProduto1607183796168 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'produto',
            columns:[
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'value',
                    type: 'varchar',
                },
                {
                    name: 'vendedor_id',
                    type: 'uuid',
                },
            ],
            foreignKeys: [
                {
                    name: 'produtoVendedor',
                    columnNames: ['vendedor_id'],
                    referencedTableName: 'vendedor',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('produto');
    }

}
