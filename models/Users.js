
const db = require('../db');

module.exports = db.defineModel('user', {
     id:db.STRING(50)
});