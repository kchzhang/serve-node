import 'egg';
import * as Mysql from "egg-mysql";
declare module 'egg' {

    interface Application {
        mysql: Mysql
    }

}