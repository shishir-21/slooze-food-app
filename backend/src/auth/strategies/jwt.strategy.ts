// JWT strategy to validate token

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SUPER_SECRET_KEY', // later move to env
    });
  }

  async validate(payload: any) {
  // Ensure the keys here match what you use in OrderService
  return { 
    userId: payload.userId, // Is it payload.userId or payload.sub?
    role: payload.role, 
    country: payload.country 
  };
}
}