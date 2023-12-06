import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { Reflector } from '@nestjs/core';
import { RedisService } from './redis/redis.service';
import { Role } from './user/entities/role.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return true;

    let roles: Role[] = await this.redisService.get(
      `user_${user.username}_roles`,
    );

    if (!roles?.length) {
      // 查询roles
      roles = await this.userService.foundPermissionByIds(
        user.roles.map((e) => e.id),
      );
      await this.redisService.set(
        `user_${user.username}_roles`,
        roles,
        60 * 30,
      );
    }

    const permissions = roles.reduce((total, current) => {
      total.push(...current.permissions);
      return total;
    }, []);

    const requirePermissions = this.reflector.getAllAndOverride(
      'require-permission',
      [context.getClass(), context.getHandler()],
    );

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
