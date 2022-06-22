import { App, Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { Application } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import UserLoginDTO from '../dto/user.dto';
import UserModel from '../model/user.model';

@Controller('/api/user')
export class HomeController {
  @Inject()
  private readonly userModule: UserModel;

  // @Inject()
  // private readonly ctx: Context;

  @Inject()
  jwtService: JwtService;
  @App()
  app: Application;
  
  @Post('/')
  hello() {
    return 'hello';
  }

  @Post('/login')
  @Validate()
  async userLogin(@Body() user: UserLoginDTO) {
    const userInfo = await this.userModule.getUserByUsernameAndPassword(user.username, user.password);
    const secret = this.app.getConfig('jwt.secret');
    if (userInfo) {
      const token = this.jwtService.signSync({ username: userInfo.username }, secret, { expiresIn: '10d' });
      return {
        code: 200,
        result: 'success',
        message: '登录成功',
        data: { token }
      };
    } else {
      return {
        code: 400,
        result: 'error',
        message: '账号或密码不正确',
        data: null
      };
    }
  }

  @Post('/saveUser')
  @Validate()
  async saveUser(@Body() user: UserLoginDTO) {
    const userInfo = this.userModule.saveUserInfo(user.username, user.password);
    return userInfo;
  }
}
