import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'library',
});

connection.query(
    'SELECT * FROM sach',
    (err, res) => {
        console.log(res)
    }
)