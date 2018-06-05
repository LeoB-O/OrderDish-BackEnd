const db = require("../db");

module.exports = db.defineModel('foods', {
    Fname:db.STRING(50),
    describeA:db.TEXT,
    image:db.TEXT,
    price:db.FLOAT,
    trueprice:db.FLOAT,
    catagory:db.TEXT,
    point:db.FLOAT,
    commentnum:db.INTEGER,
    stock:db.INTEGER,
    ordernum:db.INTEGER
});