module.exports = {
    port: process.env.Port || 3000,
    //db: process.env.MONGODB || 'mongodb+srv://GuiJiAg:hacemongo@hacebuche-atxn7.mongodb.net/hacebuche?retryWrites=true',
    db: process.env.MONGODB || 'mongodb://localhost:27017/hacebuche',
    SECRET_TOKEN: 'hacemongo',
    authGmail: 'OAuth2',
    email: 'guillermojjagudo@gmail.com',
    clientId: '536848784865-ecrss3cnnv410fqrlffkjpuamrr5b24d.apps.googleusercontent.com',
    clientSecret: 'erlnFQUrh6zVapRAY7X_ZJQH',
    refreshToken: '1/2VC0-bPW8O4uRGkH8-Xi8rcUP8KL3tDPGpAIrrcj1y8'
};