const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'gaji_karyawan',
  password: '',
});

db.addListener('error', (err) => {
  console.log(err);
});

module.exports = db

