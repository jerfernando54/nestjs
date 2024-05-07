import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { jwtConstants, ERROR_CODE} from '../../auth/constants';

@Injectable()
export class IsAuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService){}

  async canActivate( context: ExecutionContext ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if ( !token ) {
      throw new UnauthorizedException(`Token authorization is required`);
    }

    try {

      const payload = await this.jwtService.verifyAsync(
        token, { secret: jwtConstants.secret }
      );

      if (!payload.rol) {
        throw new UnauthorizedException(`Unauthorized to do this action`)
      }

      request['user'] = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        rol: payload.rol
      };

    } catch (error) {      
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException(ERROR_CODE.jwtExpired);
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException(ERROR_CODE.invalidToken);
      } else {
        throw new UnauthorizedException(ERROR_CODE.unauthorized);
      }
    }

    return true;
  }
  
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ')??[];
    return type === 'Bearer' ? token : undefined;
  }
}
