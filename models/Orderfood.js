const db = require('../db');
module.exports=db.defineModel('orderfood',{
    // fid:{type:db.STRING(50),references:{model:'Foods',key:'id'}},
    // orderid:{type:db.STRING(50),references:{model:'Orders',key:'id'}},
    fid:db.STRING(50),
    orderid:db.STRING(50)
});