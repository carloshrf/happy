import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class addUserFieldInOrphanage1603146263623 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn('orphanages', new TableColumn({
			name: 'user_id',
			type: 'integer'
		}));

		await queryRunner.createForeignKey('orphanages', new TableForeignKey({
			name: 'UserOrphanage',
			referencedColumnNames: ['id'],
			referencedTableName: 'users',
			columnNames: ['user_id'],
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('orphanages', 'user_id');
	}

}
