const crypto = require('crypto');

const createSign = (text, privateKey) => {
    const signature = crypto.createHmac('sha256', privateKey).update(text).digest('hex');
    return Buffer.from(signature).toString('base64');
};

const generateRandomString = (length) => {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
    }
    return result;
};

const getTimestamp = () => {
    return Date.now();
}

const encodeRequest = (context) => {
    const url = context.request.getUrl();
    const host = context.request.getEnvironmentVariable('host');
    const openKeyId = context.request.getEnvironmentVariable('openKeyId');
    const secretKey = context.request.getEnvironmentVariable('secretKey');
    const urlPath = url.replace(host, '').split("?")[0];
    const timestamp = getTimestamp();
    const value = `${openKeyId}&${timestamp}&${urlPath}`;
    const randomKey = generateRandomString(5);
    const key = `${secretKey}${randomKey}`;
    const sign = createSign(value, key);

    return {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-lt-openKeyId': openKeyId,
        'x-lt-timestamp': timestamp,
        'x-lt-signature': `${randomKey}${sign}`,
    };
}

module.exports.requestHooks = [
    (context) => {
        if(context.request.hasHeader('x-shein-headers') && context.request.getHeader('x-shein-headers') == 'true')
        {
        const headers = encodeRequest(context);
        for (const [header, value] of Object.entries(headers)) {
            context.request.setHeader(header, value);
        }
        context.request.removeHeader('x-shein-headers');
        }
    }
];
