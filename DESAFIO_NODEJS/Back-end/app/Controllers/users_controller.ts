import type { HttpContext } from '@adonisjs/core/http'
import User from '../../app/Models/user.js'
import Room from '../../app/Models/room.js'
//import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    const name: string = request.input('name');
    const password: string = request.input('password');
    const registration: number = request.input('registration')

    if (!name || !password) {
      return response.status(400).json({ message: 'Nome de usuário e senha são obrigatórios' });
    };
    if (typeof name != 'string' || typeof password != 'string' || typeof registration != 'string') {
      return response.status(400).json({ message: 'Tipos incorretos' });
    };
    const user = await User.query().where('registration', registration).first();
    if (user && user.password === password) {
      return response.json({ message: 'Login bem-sucedido' });
    };
    return response.status(401).json({ message: 'Credenciais inválidas' });
  };
  public async registerNewUser({ request, response }: HttpContext) {
      const name: string = request.input('name');
      const email: string = request.input('email');
      const date_of_birth: string = request.input('date_of_birth');
      const password: string = request.input('password');
      const type_access: string = 'user';
  
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
      //const hashedPassword = await hash.make(password);
      try {
        // Criptografar a senha  
        // Criar um novo usuário
        const newUser = await User.create({
          name,
          email,
          date_of_birth,  // Converter DateTime para string no formato ISO
          password//: hashedPassword
          ,registration,
          type_access
        });
  
        return response.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return response.status(500).json({ message: 'Erro ao registrar usuário' });
      };
  };
  public async listAllRoomsUser({ params, response }: HttpContext) {
    const registration: number = parseInt(params.registration, 10);
    const user = await User.query().where('registration', registration).first();

    if (typeof registration !== 'number') {
      return response.status(400).json({ message: 'O valor de registration deve ser um número válido' });
    }
  
    try {
      const rooms = await Room.query()
        .where(builder => {
          builder
            .where('student_1', registration)
            .orWhere('student_2', registration)
            .orWhere('student_3', registration)
            .orWhere('student_4', registration)
            .orWhere('student_5', registration)
            .orWhere('student_6', registration)
            .orWhere('student_7', registration)
            .orWhere('student_8', registration)
            .orWhere('student_9', registration)
            .orWhere('student_10', registration)
            .orWhere('student_11', registration)
            .orWhere('student_12', registration)
            .orWhere('student_13', registration)
            .orWhere('student_14', registration)
            .orWhere('student_15', registration)
            .orWhere('student_16', registration)
            .orWhere('student_17', registration)
            .orWhere('student_18', registration)
            .orWhere('student_19', registration)
            .orWhere('student_20', registration)
            .orWhere('student_21', registration)
            .orWhere('student_22', registration)
            .orWhere('student_23', registration)
            .orWhere('student_24', registration)
            .orWhere('student_25', registration)
            .orWhere('student_26', registration)
            .orWhere('student_27', registration)
            .orWhere('student_28', registration)
            .orWhere('student_29', registration)
            .orWhere('student_30', registration);
        })
        .select('room_number')
        .distinct(); 
  
      if (rooms.length === 0) {
        return response.status(404).json({ message: 'Nenhuma sala encontrada com o registro fornecido' });
      };
  
      return response.json( {user: user?.name, rooms: rooms.map(room => room.room_number) });
    } catch (error) {
      console.error('Erro ao buscar salas:', error);
      return response.status(500).json({ message: 'Erro ao buscar salas' });
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
    };
    const user = await User.query().where('registration', registration).first();
    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    };

    if (email && !email.includes('@')) {
      return response.status(400).json({ message: 'Email inválido' });
    };
    if (date_of_birth) {
      try {
        DateTime.fromISO(date_of_birth);
      } catch (error) {
        return response.status(400).json({ message: 'Data de nascimento inválida' });
      };
    };

    user.name = name ?? user.name
    user.email = email ?? user.email
    user.date_of_birth = date_of_birth ? DateTime.fromISO(date_of_birth) : user.date_of_birth
    user.type_access = type_access ?? user.type_access
    user.password = password ?? user.password

    try {
      await user.save();
      return response.json({ message: 'Usuário atualizado com sucesso', user });
    } catch (error) {
      return response.status(500).json({ message: 'Erro interno do servidor' });
    };
  };
  public async deleteUser({request, response}: HttpContext){    
    const registration: string = request.input('registration');
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
    const registration: number = parseInt(request.input('registration'), 10) 
    const user = await User.query().where('registration', registration).first();

    if(typeof registration != 'number'){
      return response.status(400).json({menssage: 'Por favor digite um valor correspondente a apenas numeros'})
    }
    if(!registration){
      return response.status(400).json({menssage: 'Numero de Registro necessario'})
    }
    if(!user){
      return response.status(404).json({menssage: 'Não foi possivel Encontrar usuario'})
    }
    return response.status(200).json(user)

  }
  
  //F    E    I    T    O



}