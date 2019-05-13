module.exports = {
    port: process.env.Port || 3000,
    //db: process.env.MONGODB || 'mongodb+srv://GuiJiAg:hacemongo@hacebuche-atxn7.mongodb.net/hacebuche?retryWrites=true',
    db: process.env.MONGODB || 'mongodb://localhost:27017/hacebuche',
    SECRET_TOKEN: 'hacemongo'
};