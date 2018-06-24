const db = require('../db');

module.exports=db.defineModel('discount',{
    effect:db.FLOAT,
    conditionC:db.FLOAT,
    class:db.INTEGER
});