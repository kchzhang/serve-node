import { Service } from 'egg';
/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */

  public async sayHi(name: string) {
    // const { app } = this;
    // const DB = await app.mysql.get('user_manage_demo', { name: '1' });
    // console.log(1111111, tool.MD5('123456'), DB);
    return `hi, ${name}`;
  }
}