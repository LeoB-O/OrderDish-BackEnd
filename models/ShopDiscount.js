const db = require('../db');

module.exports=db.defineModel('shopdiscount',{
    did:db.STRING(50),
    shopid:db.STRING(50),
    shopname:db.STRING(50)
});