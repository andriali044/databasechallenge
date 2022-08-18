const sequelize = require('sequelize')
const db = require('../config/db')

const foodsmodel = db.define(
    "ujicoba",
    {
        tiket:{type:sequelize.STRING},
        daerah:{type:sequelize.STRING},
        open:{type:sequelize.STRING}
    }
)

module.exports = foodsmodel