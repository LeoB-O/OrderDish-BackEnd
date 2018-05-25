const db = require('../db');

module.exports=db.defineModel('userdiscount',{
    discountid:db.STRING(50),
    num:db.INTEGER
});