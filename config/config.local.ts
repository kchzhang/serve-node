import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.mysql = {
    client: {
      host: '172.28.25.42',
      port: '3306',
      user: 'root',
      password: '12345678',
      database: 'springboot-user-demo'
    },
    default: {},
    app: true,
    agent: false
  };
  return config;
}

