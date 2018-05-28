const db = require('../db');
module.exports=db.defineModel('orderfood',{
    fid:db.STRING(50),
    orderid:db.STRING(50)
});