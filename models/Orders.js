const db = require('../db');

module.exports=db.defineModel('ordert',{
    type:db.INTEGER,
    state:db.INTEGER,
    price:db.FLOAT,
    information:db.TEXT,
    time:db.BIGINT,
    extra:db.TEXT,
    Uid:db.STRING(50),
    foods:db.TEXT  ,
    disid:db.STRING(50)
});