import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, config, middleware } = app;
  const jwt: any = middleware.jwt(config);
  router.get('/', jwt, controller.home.index);
  //路由规则 [项目名称]/[功能模块]/[方法]

  /**
   * 注册
   */
  router.post('/self/user/register', controller.user.register);

  /**
   * 登录
   */
  router.post('/self/user/login', controller.user.login);

  /**
   * 修改个人信息
   */

};
