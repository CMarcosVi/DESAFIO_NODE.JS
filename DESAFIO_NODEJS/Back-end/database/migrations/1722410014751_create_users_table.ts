import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.integer('registration').unique()
      table.dateTime('date_of_birth')
      table.string('password').notNullable()
      table.string('type_access').notNullable()
      table.string('token', 124)
      table.string('expires_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}