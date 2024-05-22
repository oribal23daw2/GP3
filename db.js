const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ahorcado'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connectat a la base de dades MySQL');
});

module.exports = connection;
