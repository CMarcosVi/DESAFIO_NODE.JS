import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare room_number: number

  @column()
  declare number_of_students: number

  @column()
  declare number_max_of_students: number
  
  @column({ columnName: 'student_1' })
  declare student_1?: number | null

  @column({ columnName: 'student_2' })
  declare student_2?: number | null

  @column({ columnName: 'student_3' })
  declare student_3?: number | null

  @column({ columnName: 'student_4' })
  declare student_4?: number | null

  @column({ columnName: 'student_5' })
  declare student_5?: number | null

  @column({ columnName: 'student_6' })
  declare student_6?: number | null

  @column({ columnName: 'student_7' })
  declare student_7?: number | null

  @column({ columnName: 'student_8' })
  declare student_8?: number | null

  @column({ columnName: 'student_9' })
  declare student_9?: number | null

  @column({ columnName: 'student_10' })
  declare student_10?: number | null

  @column({ columnName: 'student_11' })
  declare student_11?: number | null

  @column({ columnName: 'student_12' })
  declare student_12?: number | null

  @column({ columnName: 'student_13' })
  declare student_13?: number | null

  @column({ columnName: 'student_14' })
  declare student_14?: number | null
  
  @column({ columnName: 'student_15' })
  declare student_15?: number | null

  @column({ columnName: 'student_16' })
  declare student_16?: number | null

  @column({ columnName: 'student_17' })
  declare student_17?: number | null

  @column({ columnName: 'student_18' })
  declare student_18?: number | null

  @column({ columnName: 'student_19' })
  declare student_19?: number | null

  @column({ columnName: 'student_20' })
  declare student_20?: number | null

  @column({ columnName: 'student_21' })
  declare student_21?: number | null

  @column({ columnName: 'student_22' })
  declare student_22?: number | null

  @column({ columnName: 'student_23' })
  declare student_23?: number | null

  @column({ columnName: 'student_24' })
  declare student_24?: number | null

  @column({ columnName: 'student_25' })
  declare student_25?: number | null

  @column({ columnName: 'student_26' })
  declare student_26?: number | null

  @column({ columnName: 'student_27' })
  declare student_27?: number | null

  @column({ columnName: 'student_28' })
  declare student_28?: number | null

  @column({ columnName: 'student_29' })
  declare student_29?: number | null

  @column({ columnName: 'student_30' })
  declare student_30?: number | null
}