import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableOrders1657719851693 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "orders",
            columns: [
                {
                    name: "id",
                    isPrimary: true,
                    type: "uuid",
                    generationStrategy: "uuid",
                    default: 'uuid_generate_v4()'
                },
                {
                    name: "customer_id",
                    type: "uuid",
                    isNullable: true
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
            ],
            foreignKeys: [
                {
                    name: "Customer",
                    columnNames: ["customer_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "customers",
                    onDelete: "SET NULL"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("orders", true)
    }

}
