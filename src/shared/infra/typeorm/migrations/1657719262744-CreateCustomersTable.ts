import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustomersTable1657719262744 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "customers",
            columns: [
                {
                    name: "id",
                    isPrimary: true,
                    type: "uuid",
                    generationStrategy: "uuid",
                    default: 'uuid_generate_v4()'
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("customers", true)
    }

}
