import type { HttpContext } from '@adonisjs/core/http'
import User from '../../app/Models/user.js'

export default class AuthMiddlewareAdminMiddleware {
  public async handle({ request, response }: HttpContext, next: () => Promise<void>) {
    const token = request.cookie('auth_token')

    if (!token) {
      return response.status(401).json({ message: 'Token não fornecido' })
    }

    try {
      // Verifique o token em sua fonte de armazenamento (banco de dados, etc.)
      const user = await User.query().where('token', token).first()
      console.log(user?.type_access)
      if (token != user?.token) {
        return response.status(401).json({ message: 'Token inválido ou expirado' })
      }
      if(user?.type_access !== 'admin'){
        return response.status(402).json({ message: 'Credenciais não valida' })
      }else{
        await next();
      }
    } catch (error) {
      return response.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}