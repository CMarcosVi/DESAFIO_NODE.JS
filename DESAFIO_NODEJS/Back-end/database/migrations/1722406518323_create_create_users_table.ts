import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('numberOfStudents')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}