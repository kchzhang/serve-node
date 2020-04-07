import *as Crypto from 'crypto';

class Tool {
    constructor() {}
    //md5加密
    public MD5(content: string | Buffer) {
        const res = Crypto.createHash('md5').update(content, 'utf8').digest('hex');
        return { res };
    }
    //AES对称加密
}

export default new Tool();