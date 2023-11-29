import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Role } from './user/entities/role.entity';
import { Reflector } from '@nestjs/core';

//  typescript 里同名 module 和 interface 会自动合并，可以这样扩展类型。
declare module 'express' {
  interface Request {
    user: {
      username: string;
      roles: Role[];
    };
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject()
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // 判断是否需要登陆
    const requireLogin = this.reflector.getAllAndOverride('require-login', [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!requireLogin) return true;

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try {
      const token = authorization.split(' ')[1];
      const data = await this.jwtService.verify(token);
      console.log('jwtData', data);

      request.user = data.user;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('token 失效，请重新登录');
    }
  }
}
