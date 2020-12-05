import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '@myCustom_TopçÇ$Secret2020!',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    console.log('validating', payload);
    const { username } = payload;
    const user = this.userRepository.findOne({ username });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
