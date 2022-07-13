import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableOrdersProducts1657720071969 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "orders_products",
            columns: [
                {
                    name: "id",
                    isPrimary: true,
                    type: "uuid",
                    generationStrategy: "uuid",
                    default: 'uuid_generate_v4()'
                },
                {
                    name: "product_id",
                    type: "uuid",
                    isNullable: true
                },
                {
                    name: "order_id",
                    type: "uuid",
                    isNullable: true
                },
                {
                    name: "price",
                    type: "decimal",
                    precision: 5,
                    scale: 2,
                    isNullable: false
                },
                {
                    name: "quantity",
                    type: "int",
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
            ],
            foreignKeys: [
                {
                    name: "Product",
                    columnNames: ["product_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "products",
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE"
                },
                {
                    name: "Order",
                    columnNames: ["order_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "orders",
                    onDelete: "SET NULL"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("orders_products", true)
    }

}
