const db = require("../connection");
const response = require("../response");

const getAllKarir = (req, res)=>{
    const sql = `SELECT * FROM karir`;
    db.query(sql, (err,fields) =>{
        if(err instanceof Error){
            console.log(err)
            return;
        }
        response(200, fields, "Get all data karir", res)
    })
}

const getkarirById = (req, res)=>{
    const id = req.params.id;
    const sql = `SELECT * FROM karir WHERE id = ${id}`;
    db.query(sql,(err,fields) =>{
        if(err instanceof Error){
            console.log(err);
            return;
        }
        response (200, fields, `Get data karir by id = ${id}`, res)
    })
}

const createKarir = (req, res)=>{
    const {jabatan, gajiPokok, thr, tunjanganAnak, tunjanganKesehatan} =req.body;

    const sql = `INSERT INTO karir (jabatan, gaji_pokok, thr, tunjangan_anak, tunjangan_kesehatan) VALUES (?,?,?,?,?)`
    db.query(sql, [jabatan, gajiPokok, thr, tunjanganAnak, tunjanganKesehatan], (err, fields)=>{
        if(err){
            response(500, 'Invalid', 'Error', res);
        }
        if(fields?.affectedRows){
            const data = {
                isSuccess : fields.affectedRows,
            };
            response (200, data, 'insert data karir', res)
        }
    })
}



const updateKarir = (req, res)=>{
    const id = req.params.id;
    const {jabatan, gajiPokok, thr, tunjanganAnak, tunjanganKesehatan} =req.body;
    const sql = `UPDATE karir set jabatan = '${jabatan}', gaji_pokok = ${gajiPokok}, thr = ${thr}, tunjangan_anak = ${tunjanganAnak}, tunjangan_kesehatan = ${tunjanganKesehatan} WHERE id = ${id}`

    db.query(sql, (err, fields)=>{
        if(err){
            response(500, 'invalid', 'error', res)
        }
        if (fields?.affectedRows){
            const data = {
                isSuccess : fields.affectedRows,
            }
            response(200, data, 'Update data karir', res)
        }
        else{
            response(404, 'User not found', 'Error update data', res)
        }
    })
}


const deleteKarir = (req, res)=>{
    const id = req.params.id
    const sql = `DELETE FROM karir WHERE id = ${id}`;
    db.query(sql, (err, fields)=>{
        if (err){
            response(500, 'Invalid', 'Error', res)
        }
        if(fields?.affectedRows){
            const data = {
                isDeleted : fields.affectedRows,
            };
            response(200, data, "Delete data karir", res)
        }
        else{
            response(404, "User not found", "Error Delete Data", res)
        }
    })
}

module.exports = {
    getAllKarir,
    getkarirById,
    createKarir,
    updateKarir,
    deleteKarir,
}
