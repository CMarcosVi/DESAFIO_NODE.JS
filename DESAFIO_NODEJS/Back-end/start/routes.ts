/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/loginTypeUser', async () => {
  return {
    hello: 'world'
  }
})

router.get('/cadastro', async () => {
  return {
    hello: 'world'
  }
})

router.get('/excluirDadosAluno', async () => {
  return {
    hello: 'world'
  }
})

router.get('/dadosAluno/:id', async ({params}) => {
  return {
    hello: 'world'
  }
})

router.get('/salas', async ({params}) => {
  return {
    hello: 'world'
  }
})

router.get('/infoSala/:id', async ({params}) => {
  return {
    hello: 'world'
  }
})

router.get('/CriarSala', async ({params}) => {
  return {
    hello: 'world'
  }
})

router.get('/ExcluirSala', async ({params}) => {
  return {
    hello: 'world'
  }
})