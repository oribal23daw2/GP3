const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ahorcado'
});

connection.connect(err => {
    if (err) {
        console.error('Error intentant connectar a la bdd:', err);
        return;
    }
    console.log('Connectat a la base de dades!.');
});

module.exports = connection;
