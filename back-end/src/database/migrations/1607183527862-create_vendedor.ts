import {MigrationInterface, QueryRunner, Table} from "typeorm";
 
export class createVendedor1607183527862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'vendedor',
            columns:[
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'whatsapp',
                    type: 'varchar',
                },
                {
                    name: 'extension',
                    type: 'varchar',
                },
                {
                    name: 'department',
                    type: 'varchar',
                },
                {
                    name: 'pass',
                    type: 'varchar',
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vendedor');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}