const db = require('../db');

module.exports=db.defineModel('admin',{
   password:db.STRING(16),
    permission:db.INTEGER
});