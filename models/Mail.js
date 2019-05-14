module.exports = {
    name: String,
    email: String,
    phone: String,
    reserveDate: String,
    reserveHour: String,
    numberDiners: Number,
    preferedPlace: { type: String, default: 'Terraza' },
    observations: { type: String, default: 'Sin observaciones' }
};