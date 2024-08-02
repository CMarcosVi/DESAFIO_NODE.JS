import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/Models/user.js';

export default class UsersSeeder extends BaseSeeder {
  public async run () {
    // Criando múltiplos registros na tabela users
    await User.createMany([
      {
        name: 'jane_doe',
        email:  'emailUser@gmail.com',
        registration: 237,
        date_of_birth: new Date('2004-03-11T00:00:00Z'),
        password: 'password456',
        type_access: 'user'
      },
      {
        name: 'admin',
        email: 'adminUser@gmail.com',
        password: 'adminpass',
        type_access: 'admin',
      }
    ])
  }
}

