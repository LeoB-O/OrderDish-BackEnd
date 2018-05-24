const db = require('../db');

module.exports=db.defineModel('options',{
    fid:db.STRING(50),
    type:db.STRING(50),
    options:db.STRING(50),
    active:db.BOOLEAN,
});