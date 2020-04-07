import { Controller } from 'egg';
import tool from '../utils/tool';

interface UserInfoItem {
  id?: number
  name: string,
  password: string,
  type: string,
  gmt_create: Date,
  gmt_modified: Date,
  is_delete: number
}

interface UserInfo {
  DB: UserInfoItem | null
}

export default class UserController extends Controller {
  public async login(): Promise<any> {
    const { ctx, app } = this;
    const { userName, passWord } = ctx.request.body;
    //查询判断该用户是否已经注册过
    const userInfo: UserInfo = await ctx.service.user.findUserInfo(userName);
    const { DB } = userInfo;
    if (DB) {
      const { res } = tool.MD5(passWord);
      //判断密码是否一致
      if (res === DB.password) {
        const time: number = 1000 * 60 * 60;//有效期1小时
        const token: string = app.jwt.sign({
          userName,
          expireAt: new Date().getTime() + time,
        }, app.config.jwt.secret);
        ctx.append('oss-token', token);
        ctx.body = await {
          status: 200,
          message: 'success',
        };
      } else {
        ctx.body = await {
          status: 500,
          message: '密码错误',
        };
      }

    } else {
      ctx.body = await {
        status: 500,
        message: '该账号没有注册',
      };
    }

  };

  /**
   * 注册
   */
  public async register(): Promise<any> {
    const { ctx } = this;
    const { userName, passWord, type } = ctx.request.body;
    const userInfo: UserInfo = await ctx.service.user.findUserInfo(userName);
    const { DB } = userInfo;
    if (!DB) {
      const userInfoItem: UserInfoItem = {
        name: userName,
        password: tool.MD5(passWord).res,
        type: type || 'O',
        gmt_create: new Date(),
        gmt_modified: new Date(),
        is_delete: 0
      };
      const { DB } = await ctx.service.user.insertUserInfo(userInfoItem);
      const { affectedRows } = DB;
      if (affectedRows === 1) {
        ctx.body = {
          status: 200,
          message: '注册成功',
        };
      }
    } else {
      ctx.body = {
        status: 500,
        message: '该用户已被注册',
      };
    }
  }
}