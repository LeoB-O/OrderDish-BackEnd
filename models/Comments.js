const db = require('../db');

module.exports=db.defineModel('comment',{
   time:db.BIGINT,
    fname:db.TEXT,
    comment:db.TEXT,
    Uid:db.STRING(50)
});