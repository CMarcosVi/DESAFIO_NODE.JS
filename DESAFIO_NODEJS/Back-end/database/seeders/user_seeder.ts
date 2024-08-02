import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/Models/user.js';
import hash from '@adonisjs/core/services/hash';

export default class UsersSeeder extends BaseSeeder {
  public async run () {
    const passwordUser: string = 'passwordAdmin123';
    const passwordAdmin: string = 'passwordUser123';
    const myHashUser: string = await hash.make(passwordUser);
    const myHashAdmin: string = await hash.make(passwordAdmin);
    await User.createMany([
      {
        name: 'John Hemilton',
        email:  'emailUser@gmail.com',
        registration: 23712,
        date_of_birth: '2004-03-11',
        password: myHashUser,
        type_access: 'user'
      },
      {
        name: 'admin',
        email: 'adminAdmin@gmail.com',
        registration: 1,
        date_of_birth: '2004-03-11',
        password: myHashAdmin,
        type_access: 'admin',
      }
    ])
  }
}

