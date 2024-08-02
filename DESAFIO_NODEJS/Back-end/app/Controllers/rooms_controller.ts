import type { HttpContext } from '@adonisjs/core/http'
import Room from '../../app/Models/room.js'

export default class RoomsController {
  //completo
  public async consultByRoom({request, response}: HttpContext){
    const room_number: number = parseInt(request.input('room_number'), 10);
  

    if (!room_number) {
      return response.status(400).json({ message: 'Campo obrigatorio não preenchido ' });
    };

    if ( typeof room_number !== 'number') {
      return response.status(400).json({ message: 'Insira um Valor Valido' });
    };
    const room = await Room.query().where('room_number', room_number).first();
    if (!room) {
      return response.status(404).json({ message: 'Sala não encontrada' });
    };
    return response.json(room);
  };
  public async createRoom({ request, response }: HttpContext) {
    const room_number: number = parseInt(request.input('room_number'), 10);
    const number_of_students: number = 0;
    const number_max_of_students: number = 30;

    if (!room_number) {
      return response.status(400).json({ message: 'Campo obrigatorio não preenchido ' });
    };

    if ( typeof room_number !== 'number') {
      return response.status(400).json({ message: 'Insira um Valor Valido' });
    };

    const existingRoom = await Room.findBy('room_number', room_number);

    if (existingRoom) {
      return response.status(400).json({ message: 'A sala com esse número já existe.' });
    };

    const room = await Room.create({
      room_number,
      number_of_students,
      number_max_of_students
    });

    return response.status(201).json({ message: 'Sala criada com sucesso', room });
  };
  public async updateRoom({ request, response }: HttpContext) {
    const room_number: number = request.input('room_number');
    const new_number: number = request.input('new_number');
    const number_of_students: number = request.input('number_of_students');
    const room = await Room.query().where('room_number', room_number).first();

    if (!room_number || !new_number || !number_of_students) {
      return response.status(400).json({ message: 'Campo obrigatorio não preenchido ' });
    };

    if ( typeof room_number == 'number' || typeof new_number == 'number' || typeof number_of_students  == 'number') {
      return response.status(400).json({ message: 'Insira um Valor Valido' });
    };

    if (!room) {
      return response.status(404).json({ message: 'Sala não encontrada' });
    };

    room.room_number = new_number;
    room.number_of_students = number_of_students;
    await room.save();

    return response.json({ message: 'Sala atualizada com sucesso', room });
  };
  public async getAllRooms({ response }: HttpContext) {
    const rooms = await Room.query().select("*");
    return response.json({ rooms });
  };
  public async deleteRoom({ request, response }: HttpContext) {
    const room_number: number = parseInt(request.input('room_number'), 10);
    const room = await Room.query().where('room_number', room_number).first();
    if (!room_number) {
      return response.status(400).json({ message: 'Campo obrigatorio não preenchido ' });
    };
    if ( typeof room_number !== 'number') {
      return response.status(400).json({ message: 'Insira um Valor Valido' });
    };
    if (!room) {
      return response.status(404).json({ message: 'Sala não encontrada' });
    };
    await room.delete();
    return response.json({ message: 'Sala excluída com sucesso' });
  };
  public async addStudent({ request, response }: HttpContext) {
    const room_number: number = parseInt(request.input('room_number'),10);
    const registration: number = parseInt(request.input('registration'), 10);
    const studentIndex: number = parseInt(request.input('student_index'), 10);

    if (!room_number || !registration || !studentIndex) {
      return response.status(400).json({ message: 'Campo obrigatorio não preenchido ' });
    };

    if ( typeof room_number !== 'number' || typeof registration !== 'number' || typeof studentIndex  !== 'number') {
      return response.status(400).json({ message: 'Insira um Valor Valido' });
    };

    if (studentIndex < 1 || studentIndex > 30) {
      return response.status(400).json({ message: 'Índice do aluno deve estar entre 1 e 30' });
    };

    const studentLine = `student_${studentIndex}` as keyof Room;      

    const numberIndex = await Room.query().where(studentLine, studentIndex).first();

    if(numberIndex != null){
      return response.status(400).json({ message: 'O indice escolhido ja esta sendo usado escolha outro' });
    }
    
    const room = await Room.query().where('room_number', room_number).first();

    if (!room) {
      return response.status(404).json({ message: 'Sala não encontrada' });
    };

    for (let i = 1; i <= 30; i++) {
      const column = `student_${i}` as keyof Room;
      if (room[column] === registration) {
        return response.status(400).json({ message: `Número de matrícula ${registration} já está registrado.` });
      };
    };
    const studentColumn = `student_${studentIndex}` as keyof Room
    room[studentColumn] = registration;

    await room.save();

    return response.json({ message: `Número do aluno ${studentIndex} adicionado com sucesso`, room });
  };
  public async removeStudent({ request, response }: HttpContext) {
    const roomNumber: number = parseInt(request.input('room_number'), 10);
    const studentIndex: number = parseInt(request.input('student_index'), 10);
    const room = await Room.query().where('room_number', roomNumber).first();
    if (!room) {
      return response.status(404).json({ message: 'Sala não encontrada' });
    }

    const studentColumn = `student_${studentIndex}` as keyof Room;
    if (!(studentColumn in room)) {
      return response.status(400).json({ message: 'O aluno não existe' });
    }
    room[studentColumn] = null;
    await room.save();
    return response.status(200).json({ message: 'O aluno foi removido' })
  };
}