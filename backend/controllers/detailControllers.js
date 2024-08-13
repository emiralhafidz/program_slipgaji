const db = require("../connection");
const response = require("../response");

const getAllDetail = (req, res)=>{
    const sql = `SELECT * FROM detail`;
    db.query(sql, (err,fields) =>{
        if(err instanceof Error){
            console.log(err)
            return;
        }
        response(200, fields, "Get all detail data", res)
    })
}

const getDetailById = (req, res)=>{
    const id = req.params.id;
    const sql = `SELECT * FROM detail WHERE id = ${id}`;
    db.query(sql,(err,fields) =>{
        if(err instanceof Error){
            console.log(err);
            return;
        }
        response (200, fields, `Get detail data by id = ${id}`, res)
    })
}

const createDetail = (req, res)=>{
    const {nama, jabatan} =req.body;
    const sql = `INSERT INTO detail (nama, jabatan) VALUES ( ?, ?)`
    db.query(sql, [nama, jabatan], (err, fields)=>{
        if(err){
            response(500, 'Invalid', 'Error', res);
        }
        if(fields?.affectedRows){
            const data = {
                isSuccess : fields.affectedRows,
            };
            response (200, data, 'insert detail data', res)
        }
    })
}



const updateDetail = (req, res)=>{
    const id = req.params.id;
    const {nama, jabatan} =req.body;
    const sql = `UPDATE detail set nama = '${nama}',  jabatan = '${jabatan}' WHERE id = ${id}`

    db.query(sql, (err, fields)=>{
        if(err){
            response(500, 'invalid', 'error', res)
        }
        if (fields?.affectedRows){
            const data = {
                isSuccess : fields.affectedRows,
            }
            response(200, data, 'Update detail data', res)
        }
        else{
            response(404, 'User not found', 'Error update data', res)
        }
    })
}


const deleteDetail = (req, res)=>{
    const id = req.params.id
    const sql = `DELETE FROM detail WHERE id = ${id}`;
    db.query(sql, (err, fields)=>{
        if (err){
            response(500, 'Invalid', 'Error', res)
        }
        if(fields?.affectedRows){
            const data = {
                isDeleted : fields.affectedRows,
            };
            response(200, data, "Delete detail data", res)
        }
        else{
            response(404, "User not found", "Error Delete Data", res)
        }
    })
}

module.exports = {
    getAllDetail,
    getDetailById,
    createDetail,
    updateDetail,
    deleteDetail,
}
