const db = require('../db');

module.exports=db.defineModel('ordert',{
    state:db.INTEGER,
    price:db.FLOAT,
    addressid:{type:db.TEXT,allowNull:true},
    time:{type:db.BIGINT,allowNull:true},
    extra:{type:db.TEXT,allowNull:true},
    Uid:db.STRING(50),
    disid:{type:db.STRING(50),allowNull:true},
});