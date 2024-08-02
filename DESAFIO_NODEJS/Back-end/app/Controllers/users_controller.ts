import type { HttpContext } from '@adonisjs/core/http'
import User from '../../app/Models/user.js'
import Room from '../../app/Models/room.js'
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash';
import crypto from 'crypto'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    const password: string = request.input('password');
    const registration: number = parseInt(request.input('registration'), 10);
    if (!registration || !password) {
      return response.status(400).json({ message: 'Número de Registro e senha são obrigatórios' });
    }
    if (isNaN(registration)) {
      return response.status(400).json({ message: 'Número de Registro inválido' });
    }
    try {
      const user = await User.query().where('registration', registration).first();
      if (!user) {
        return response.status(401).json({ message: 'Credenciais inválidas' });
      }
      const isPasswordValid = await hash.verify(user.password, password);
      if (isPasswordValid) {
        const token = crypto.randomBytes(32).toString('hex');
        user.token = token;
        const futureDate = DateTime.now().plus({ days: 2 });
        const formattedDate = futureDate.toFormat('yyyy-MM-dd');
        user.expires_at = formattedDate
        await user.save();  
        try{
          response.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict', 
            maxAge: 2 * 24 * 60 * 60 * 1000
          });
          return response.status(200).json({ message: 'Login bem-sucedido' });
        }catch{
          response.status(401).json({ message: 'problemas para salvar'})
        }
      } else {
        return response.status(401).json({ message: 'Credenciais inválidas' });
      }
    } catch (err) {
      return response.status(500).json({ message: 'Erro interno do servidor' });
    }
  };
  public async registerNewUser({ request, response }: HttpContext) {
      const name: string = request.input('name');
      const email: string = request.input('email');
      const date_of_birth: string = request.input('date_of_birth');
      const password: string = request.input('password');
      const type_access: string = 'user';

      const myHash = await hash.make(password);

      function getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
      };
      let registration: number;
      let user: User | null;
      do {
        registration = getRandomNumber(0, 100001);
        user = await User.query().where('registration', registration).first();
      } while (user !== null);
  
      if (!name || !email || !date_of_birth || !password) {
        return response.status(400).json({ message: 'Todos os campos são obrigatórios' });
      };
  
      let birthDate: DateTime;
      try {
        birthDate = DateTime.fromISO(date_of_birth);
        if (!birthDate.isValid) {
          return response.status(400).json({ message: 'Data de nascimento inválida' });
        };
      } catch (error) {
        return response.status(400).json({ message: 'Data de nascimento inválida' });
      };
  
      const existingUser = await User.query().where('email', email).first();
      if (existingUser) {
        return response.status(400).json({ message: 'Email já registrado' });
      };
      try {
        const newUser = await User.create({
          name,
          email,
          date_of_birth: birthDate.toFormat('yyyy-MM-dd'),  // Converter DateTime para string no formato ISO
          password: myHash
          ,registration,
          type_access
        });
  
        return response.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return response.status(500).json({ message: 'Erro ao registrar usuário' });
      };
  };
  public async editUser({ request, response }: HttpContext) {
    const name: string | undefined = request.input('name');
    const email: string | undefined = request.input('email');
    const registration: number | undefined = request.input('registration');
    const date_of_birth: string | undefined = request.input('date_of_birth');
    const password: string | undefined = request.input('password');
    const type_access: string | undefined = request.input('type_access');
    if (!registration) {
      return response.status(400).json({ message: 'Número de registro do usuário é obrigatório' });
    }
    const user = await User.query().where('registration', registration).first();
    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }
    if (email && !email.includes('@')) {
      return response.status(400).json({ message: 'Email inválido' });
    }

    // Valida a data de nascimento se fornecida
    if (date_of_birth) {
      try {
        const birthDate = DateTime.fromISO(date_of_birth);
        if (!birthDate.isValid) {
          return response.status(400).json({ message: 'Data de nascimento inválida' });
        }
        user.date_of_birth = birthDate.toFormat('yyyy-MM-dd'); // Converte para o formato YYYY-MM-DD
      } catch (error) {
        return response.status(400).json({ message: 'Data de nascimento inválida' });
      }
    }

    // Atualiza os campos do usuário
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.type_access = type_access ?? user.type_access;

    // Atualiza a senha se fornecida
    if (password) {
      user.password = await hash.make(password);
    }

    try {
      await user.save();
      return response.json({ message: 'Usuário atualizado com sucesso', user });
    } catch (error) {
      return response.status(500).json({ message: 'Erro interno do servidor' });
    };
  };
  public async deleteUser({request, response}: HttpContext){    
    const registration: number = request.input('registration');
    if (typeof registration != 'number') {
      return response.status(400).json({ message: 'Numero de registro só deve conter numero' });
    };
    if (!registration) {
      return response.status(400).json({ message: 'Numero de registro é obrigatório' });
    };
    const user = await User.query().where('registration', registration).first();

    if (user) {
      await user.delete();

      return response.json({ message: 'Usuário deletado com sucesso' });
    }
    return response.status(401).json({ message: 'Credenciais inválidas' });
  };
  public async consultUser({request,response}: HttpContext){
    const registration: number = parseInt(request.input('registration'), 10) ;
    const user = await User.query().where('registration', registration).first();

    if(typeof registration != 'number'){
      return response.status(400).json({menssage: 'Por favor digite um valor correspondente a apenas numeros'});
    }
    if(!registration){
      return response.status(400).json({menssage: 'Numero de Registro necessario'});
    }
    if(!user){
      return response.status(404).json({menssage: 'Não foi possivel Encontrar usuario'});
    }
    return response.status(200).json(user);
  };
  public async listAllRoomsUser({ request, response }: HttpContext) {
      const registration: number = parseInt(request.input('registration'),10);
      if (typeof registration != 'number') {
        return response.status(400).json({ message: 'O valor de registration deve ser um número válido' });
      }
      try {
        const user = await User.query().where('registration', registration).first();
        if (!user) {
          return response.status(404).json({ message: 'Usuário não encontrado' });
        }
        const rooms = await Room.query()
          .where(builder => {
            for (let i = 1; i <= 30; i++) {
              builder.orWhere(`student_${i}`, registration);
            }
          })
          .select('room_number')
          .distinct(); 
  
        if (rooms.length === 0) {
          return response.status(404).json({ message: 'Nenhuma sala encontrada com o registro fornecido' });
        }
  
        return response.json({ user: user.name, rooms: rooms.map(room => room.room_number) });
      } catch (error) {
        return response.status(500).json({ message: 'Erro ao buscar salas' });
      }
  };
  }