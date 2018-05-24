const db = require('../db');

module.exports=db.defineModel('useraddress',{
    address:db.TEXT,
    Uid:db.STRING(50)
});