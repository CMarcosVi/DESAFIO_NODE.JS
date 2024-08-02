import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email?: string

  @column()
  declare registration?: number

  @column.dateTime()
  declare date_of_birth?: DateTime 

  @column()
  declare password: string

  @column()
  declare type_access: string
}

