import { Context, EggAppConfig } from 'egg';
export default (options: EggAppConfig) => {
    return async function jwt(ctx: Context, next: () => Promise<any>) {
        const token = ctx.request.header['x-user-token'];
        let decode: any;
        if (token) {
            try {
                // 解码token
                decode = ctx.app.jwt.verify(token, options.jwt.secret);
                ctx.state.user = decode;
                const { expireAt } = decode;
                const curTime = new Date().getTime();
                if (expireAt < curTime) {
                    ctx.status = 401;
                    ctx.body = {
                        status: 401,
                        message: 'token失效',
                    };
                    return;
                }
                await next();
            } catch (error) {
                ctx.status = 500;
                console.log(error);
                ctx.body = {
                    status: 500,
                    message: error.message,
                };
                return;
            }
        } else {
            ctx.status = 401;
            ctx.body = {
                status: 401,
                message: 'token失效',
            };
            return;
        }
    };
}