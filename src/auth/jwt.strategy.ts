// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MeusProfessoresSaoOsMelhores', // Use uma variável de ambiente
    });
  }

  async validate(payload: any) {
    console.log('validando payload:', payload)
    return {email: payload.email, userType: payload.userType };
  }
  
}
