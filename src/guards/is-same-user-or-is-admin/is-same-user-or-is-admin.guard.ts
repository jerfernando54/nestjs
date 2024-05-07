import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IsAdminGuard, IsSameUserGuard } from '../index';

@Injectable()
export class IsSameUserOrIsAdminGuard implements CanActivate {

  constructor(
    private readonly sameUserGuard: IsSameUserGuard,
    private readonly adminGuard: IsAdminGuard
  ) {}

  async canActivate( context: ExecutionContext ): Promise<boolean>  {
    return await this.sameUserGuard.canActivate(context) || this.adminGuard.canActivate(context)
  } 
}
