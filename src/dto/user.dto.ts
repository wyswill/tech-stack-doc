import { Rule, RuleType } from '@midwayjs/validate';

export default class UserLoginDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}
