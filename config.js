module.exports = {
    port: process.env.Port || 3000,
    db: process.env.MONGODB || 'mongodb://localhost:27017/hacebuche',
    SECRET_TOKEN: 'hacemongo'
};