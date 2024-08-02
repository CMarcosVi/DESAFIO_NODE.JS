// app/Services/JwtService.ts
import { Env } from '@adonisjs/core/env'
import jwt from 'jsonwebtoken'

// Acessa a variável JWT_SECRET
const JWT_SECRET = Env.get('JWT_SECRET')

export class JwtService {
  static generateToken(payload: object, expiresIn: string = '1h') {
    return jwt.sign(payload, JWT_SECRET, { expiresIn })
  }

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET)
    } catch (err) {
      throw new Error('Invalid token')
    }
  }
}
