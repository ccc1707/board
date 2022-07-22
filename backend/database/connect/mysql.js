const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    port : 3306,
    user: "board",
    password: "p1801006",
    database: "board"
});

module.exports = conn;