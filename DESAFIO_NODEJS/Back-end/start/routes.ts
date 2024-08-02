import router from '@adonisjs/core/services/router'
import AuthController from '../app/Controllers/users_controller.js'
import RoomsController from '../app/Controllers/rooms_controller.js'
import { middleware } from '#start/kernel'


  router.group(() => {
    router.get('/', async () => { return {hello: 'world',}})
    router.post('/loginVerify', [AuthController, 'login'])
  })

  router.group(() => {
    router.get('/user', async () => { return {hello: 'world'}})
    router.get('/users/registration/rooms/allRooms', [AuthController, 'listAllRoomsUser'])
  }).use(middleware.AuthMiddleware())

  router.group(() => {
    router.get('/admin', async () => {return {hello: 'world'}})
    router.post('/admin/registerNewUser',[AuthController, 'registerNewUser'] )
    router.put('/admin/editUser',[AuthController, 'editUser'] )
    router.delete('/admin/deleteUser',[AuthController, 'deleteUser'] )
    router.get('/admin/consultUser',[AuthController, 'consultUser'] )
    router.get('/admin/consultRoom',[RoomsController, 'consultByRoom'] )
    router.post('/admin/createRoom', [RoomsController, 'createRoom'] )
    router.put('/admin/updateRoom', [RoomsController, 'updateRoom'])
    router.get('/admin/getAllRooms',[RoomsController, 'getAllRooms'] )
    router.delete('/admin/deleteRoom',[RoomsController, 'deleteRoom'] )
    router.put('/admin/addStudent', [RoomsController, 'addStudent'])
    router.put('/admin/removeStudent', [RoomsController, 'removeStudent'])
  }).use(middleware.AuthMiddlewareAdmin())
/*
  router.group(() => {
    router.get('/user', [AuthController,])
    router.get('/users/:registration/rooms', [AuthController, 'listAllRoomsUser'])
  }).use(middleware.AuthMiddleware())

  /*router.any('*', async ({ response }) => {
    return response.status(404).send({
      message: 'Página não encontrada. Redirecionando para a página inicial...',
    })
  })*/
