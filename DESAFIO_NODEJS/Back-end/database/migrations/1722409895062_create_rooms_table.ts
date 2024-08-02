import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('room_number').notNullable().unique()
      table.integer('number_of_students').notNullable()
      table.integer('number_max_of_students').notNullable()
      for (let i = 1; i <= 30; i++) {
        table.integer(`student_${i}`).nullable()
      }
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}