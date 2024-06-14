import db from "../config/database.js"

const getAllReaders = (req, res) => {
    const sql = 'select * from DocGia'
    db.query(
        sql,
        (err, result) => {
            if (err) {
                console.log(err)
                res.json('error')
            }
            res.json(result);
        }
    )
}

const postReader = (req, res) => {
    const sql = 'insert into DocGia (HoTen, DiaChi, SDT, TrangThai) values (?, ?, ?, ?)'
    db.query(sql, [req.body.HoTen, req.body.DiaChi, req.body.SDT, req.body.TrangThai],
        (err, result) => {
            if (err) {
                console.log(err)
                res.json('error')
            }
            const maDocGia = result.insertId
            db.query('select * from DocGia where MaDocGia=?', [maDocGia],
                (err, result) => {
                    res.json(result[0])
                })

            // res.json(result.insertId)
            // res.json('reader posted');
        }
    )
}

const updateReader = (req, res) => {
    const maDocGia = req.params.id
    const data = Object.entries(req.body).map(([key, value]) => `${key}="${value}"`).join(', ')
    const sql = `update DocGia set ${data} where MaDocGia = ${maDocGia}`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.json("error")
        }
        res.json("reader updated")
    })
}

const deleteReader = (req, res) => {
    const maDocGia = req.params.id
    const sql = `delete from DocGia where MaDocGia = "${maDocGia}"`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.json("error")
        }
        res.json("reader deleted")
    })
}
const searchReader = (req, res) => {
    const { MaDocGia, HoTen } = req.query;
    let sql = 'select * from DocGia where 1=1';
    const params = [];

    if (MaDocGia) {
        sql += ' and MaDocGia = ?';
        params.push(MaDocGia);
    }

    if (HoTen) {
        sql += ' and HoTen like ?';
        params.push(`%${HoTen}%`);
    }

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            res.json('error');
        }
        res.json(result);
    });
}
export default { getAllReaders, postReader, updateReader, deleteReader, searchReader }