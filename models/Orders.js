const db = require('../db');

module.exports=db.defineModel('ordert',{
    state:db.INTEGER,
    price:db.FLOAT,
    information:db.TEXT,
    time:db.BIGINT,
    extra:db.TEXT,
    Uid:db.STRING(50),
    disid:db.STRING(50),
    shopid:db.STRING(50)
});