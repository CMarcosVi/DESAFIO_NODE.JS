import router from '@adonisjs/core/services/router'
import AuthController from '../app/Controllers/users_controller.js'
import RoomsController from '../app/Controllers/rooms_controller.js'

//import { middleware } from '#start/kernel'

  router.get('/', async () => {
    return {
      hello: 'world',
    }
  })
  router.get('/loginVerify', [AuthController, 'login'])
  //checked
  router.group(() => {
    router.post('/admin/createRoom', [RoomsController, 'createRoom'] )
    router.get('/admin/consultRoom',[RoomsController, 'consultByRoom'] )
    router.delete('/admin/deleteRoom',[RoomsController, 'deleteRoom'] )
    router.get('/admin/getAllRooms',[RoomsController, 'getAllRooms'] )
    router.put('/admin/updateRoom', [RoomsController, 'updateRoom'])
    router.put('/admin/addStudent', [RoomsController, 'addStudent'])
    router.put('/admin/removeStudent', [RoomsController, 'removeStudent'])
    router.post('/admin/registerNewUser',[AuthController, 'registerNewUser'] )
    router.get('/users/:registration/rooms', [AuthController, 'listAllRoomsUser'])
    router.get('/admin/consultUser',[AuthController, 'consultUser'] )
    router.put('/admin/editUser',[AuthController, 'editUser'] )
  })
 
  
  /*



    router.post('/admin/deleteUser',[AuthController, 'deleteUser'] )


  */

  
  // A rota catch-all para tratar erros 404

    /*
  */
  /*router.any('*', async ({ response }) => {
    return response.status(404).send({
      message: 'Página não encontrada. Redirecionando para a página inicial...',
    })
  })*/
