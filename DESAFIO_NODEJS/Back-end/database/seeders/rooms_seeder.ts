import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Room from '../../app/Models/room.js'

export default class RoomsSeeder extends BaseSeeder {
  public async run () {
    await Room.createMany([
      {
        room_number: 332,
        number_of_students: 0,
        number_max_of_students: 30,
        student_1: null,
        student_2: null ,
        student_3: null,
        student_4: null ,
        student_5: null,
        student_6: null,
        student_7: null,
        student_8: null,
        student_9: null,
        student_10: null, 
        student_11: null,
        student_12: null,
        student_13: null,
        student_14: null,
        student_15: null,
        student_16: null,
        student_17: null,
        student_18: null,
        student_19: null,
        student_20: null,
        student_21: null,
        student_22: null,
        student_23: null,
        student_24: null,
        student_25: null,
        student_26: null,
        student_27: null,
        student_28: null,
        student_29: null,
        student_30: null,
      }
    ])
  }
}
