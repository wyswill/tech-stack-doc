import { httpError } from '@midwayjs/core';
import { Inject, Middleware } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { Context, NextFunction } from '@midwayjs/koa';
import cofnig from '../config/config.default';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError();
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }

      const [scheme, token] = parts;

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          await this.jwtService.verify(token, {
            complete: true
          });
          next()
        } catch (error) {
          //token过期 生成新的token
          const newToken = this.getToken(ctx.user, cofnig.jwt.secret);
          //将新token放入Authorization中返回给前端
          ctx.set('Authorization', newToken);
        }
      }
    };
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    const ignore = ['/api/user/saveUser', '/api/user/login'].includes(ctx.path);
    return !ignore;
  }

  private getToken(user: any, secret: string): string {
    return this.jwtService.signSync(user, secret, { expiresIn: '10d' });
  }
}
