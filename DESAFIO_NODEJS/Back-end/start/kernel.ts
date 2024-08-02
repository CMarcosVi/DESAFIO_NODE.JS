import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

server.errorHandler(() => import('#exceptions/handler'))

server.use([
  () => import('#middleware/container_bindings_middleware'),
  () => import('#middleware/force_json_response_middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
])

router.use([

])

export const middleware = router.named({
  AuthMiddleware: () => import('#middleware/auth_middleware'),
  AuthMiddlewareAdmin: () => import('#middleware/auth_middleware_admin_middleware')
})
