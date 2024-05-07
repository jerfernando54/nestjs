import { CanActivate, ExecutionContext, Injectable, Param, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class IsSameUserGuard implements CanActivate {
  async canActivate( context: ExecutionContext ): Promise<boolean>  {
    
    const request = context.switchToHttp().getRequest();

    const userIdFromRequest = request.user.id;
    const userIdFromParams = request.params.id

    console.log(userIdFromRequest)

    if (!userIdFromRequest ||  userIdFromRequest !== userIdFromParams)
      throw new UnauthorizedException('Access denied. You can only access your own information');

    return true;
  }
}
