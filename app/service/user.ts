import { Service } from 'egg';

/**
 * User Service
 */
export default class User extends Service {

  public async findUserInfo(name: string): Promise<any> {
    const { app } = this;
    const DB = await app.mysql.get('user_manage_demo', { name });
    return { DB };
  }

  public async insertUserInfo(info: object): Promise<any> {
    const { app } = this;
    const DB = await app.mysql.insert('user_manage_demo', info);
    return { DB };
  }
}