import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(4333);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('request.user', request.user);

    if (!user) return true;

    // 查询roles
    const roles = await this.userService.foundPermissionByIds(
      user.roles.map((e) => e.id),
    );

    const permissions = roles.reduce((total, current) => {
      total.push(...current.permissions);
      return total;
    }, []);

    console.log('permissions', permissions);

    const requirePermissions = this.reflector.getAllAndOverride(
      'require-permission',
      [context.getClass(), context.getHandler()],
    );

    console.log('requirePermissions', requirePermissions);

    for (let index = 0; index < requirePermissions.length; index++) {
      const requirePermission = requirePermissions[index];
      const found = permissions.find((e) => e.name === requirePermission);
      if (!found) {
        throw new UnauthorizedException('您没有访问该接口的权限');
      }
    }

    return true;
  }
}
