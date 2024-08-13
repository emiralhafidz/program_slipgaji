const db = require("../connection");
const response = require("../response");

const getAllGuru = (req, res) => {
  const sql = `SELECT * FROM pegawai`;
  db.query(sql, (err, fields) => {    
    if (err instanceof Error) {
      console.log(err);
      return;
    }
    response(200, fields, "Get all data guru", res);
  });
};

const getGuruById = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM pegawai WHERE id = ${id}`;
  db.query(sql, (err, fields) => {
    if (err instanceof Error) {
      console.log(err);
      return;
    }
    response(200, fields, `Get data guru by id = ${id}`, res);
  });
};


const createGuru = (req, res) => {
  const { nama, nip, alamat, email } = req.body;
  // Format tanggalLahir to yyyy-mm-dd
  const sql = `INSERT INTO pegawai (nama, nip, alamat, email) VALUES (?,?,?,?)`;
  db.query(sql, [nama, nip, alamat, email], (err, fields) => {
    if (err) {
      response(500, "invalid", "error", res);
    }
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
      };
      response(200, data, "insert data guru", res);
    }
  });
};

const updateGuru = (req, res) => {
  const id = req.params.id;
  const { nama, nip, alamat, email } = req.body;
  const sql = `UPDATE pegawai SET nama = '${nama}', nip = ${nip}, alamat = '${alamat}', email = '${email}' WHERE id = ${id}`;
  db.query(sql, (err, fields) => {
    if (err) {
      response(500, "invalid", "error", res);
    }
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
      };
      response(200, data, "update data guru", res);
    } else {
      response(404, "user not found", "error update data", res);
    }
  });
};

const deleteGuru = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM pegawai WHERE id = ${id}`;
  db.query(sql, (err, fields) => {
    if (err) {
      response(500, "invalid", "error", res);
    }
    if (fields?.affectedRows) {
      const data = {
        isDeleted: fields.affectedRows,
      };
      response(200, data, "delete data guru", res);
    } else {
      response(404, "user not found", "error delete data", res);
    }
  });
};

module.exports = {
  getAllGuru,
  getGuruById,
  createGuru,
  updateGuru,
  deleteGuru,
};
