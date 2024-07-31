import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'Users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username').notNullable().unique()
      table.string('password').notNullable()
      table.string('typeAccess').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}