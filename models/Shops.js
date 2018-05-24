const db = require('../db');

module.exports=db.defineModel('shop',{
    address:db.TEXT,
    name:db.STRING(50),
    image:db.TEXT,
    point:db.FLOAT,
    worktime:db.STRING(50),
    sale:db.INTEGER
});