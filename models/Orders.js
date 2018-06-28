const db = require('../db');

module.exports=db.defineModel('ordert',{
    state:db.INTEGER,
    price:db.FLOAT,
    addressid:db.TEXT,
    time:{type:db.BIGINT,allowNull:true},
    extra:{type:db.TEXT,allowNull:true},
    Uid:db.STRING(50),
<<<<<<< HEAD
    disid:{type:db.STRING(50),allowNull:true},
    shopid:db.STRING(50)
=======
    disid:db.STRING(50)
>>>>>>> origin/master
});