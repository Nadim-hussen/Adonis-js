import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
       table.string('title');
      table.text('description');
      table.bigint('user_id').unsigned().references('id').inTable('users');
      table.timestamps(true,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
