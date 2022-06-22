import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { InsertResult, Repository } from 'typeorm';
import UserEntity from '../entity/user.entity';

@Provide()
export default class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(username: string, password: string): Promise<UserEntity> {
    return this.userRepo.findOne({ where: { username, password } });
  }

  async saveUserInfo(username: string, password: string): Promise<InsertResult> {
    return this.userRepo.insert({ username, password });
  }
}
