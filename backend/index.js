const db = require("./connection");
const response = require("./response");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(200, "ini data", "ini message", res);
});

app.get("/karyawan", (req, res) => {
  const sql = "SELECT * FROM KARYAWAN";
  db.query(sql, (err, fields) => {
    if (err instanceof Error) {
      console.log(err);
      return;
    }
    response(200, fields, "get all data karyawan", res);
  });
});

app.get("/karyawan/:nip", (req, res) => {
  const nip = req.params.nip;
  const sql = `SELECT * FROM karyawan WHERE nip = ${nip}`;
  db.query(sql, (err, fields) => {
    if (err instanceof Error) {
      console.log(err);
      return;
    }
    response(200, fields, `data dengan nip ${nip}`, res);
  });
});

app.post("/karyawan", (req, res) => {
  const { nama, nip, posisi } = req.body;
  const sql = `INSERT INTO karyawan (nama, nip, posisi) VALUES ('${nama}', ${nip}, '${posisi}')`;
  db.query(sql, (err, fields) => {
    if (err) {
      response(500, "invalid", "error", res);
    }
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "insert data", res);
    }
  });
});

app.put("/karyawan", (req, res) => {
  const { nama, nip, posisi } = req.body;
  const sql = `UPDATE karyawan SET nama = '${nama}', nip = ${nip}, posisi = '${posisi}' WHERE nip = ${nip}`;
  db.query(sql, (err, fields) => {
    if (err) {
      response(500, "invalid", "error", res);
    }
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
      };
      response(200, data, "update data berhasil", res);
    } else {
      response(404, "user not found", "error", res);
    }
  });
});

app.delete("/karyawan", (req, res) => {
  const { nip } = req.body;
  const sql = `DELETE FROM karyawan WHERE nip = ${nip}`;
  db.query(sql, (err, fields) => {
    if (err) {
      response(500, "invalid error", "error", res);
    }
    if (fields?.affectedRows) {
      const data = {
        isDeleted: fields.affectedRows,
      };
      response(200, data, "Delete succesfully", res);
    } else {
      response(404, "data not found", "error", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
