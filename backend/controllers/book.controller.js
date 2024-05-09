import db from '../config/database.js'

const getAllBooks = (req, res) => {
    const sql = 'select * from Sach'
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

const postBook = (req, res) => {
    const sql = 'insert into Sach (TenSach, TheLoai, TacGia, MaNXB) values (?, ?, ?, ?)'
    db.query(sql, [req.body.TenSach, req.body.TheLoai, req.body.TacGia, req.body.MaNXB],
        (err, result) => {
            if (err) {
                console.log(err)
                res.json('error')
            }
            res.json('book posted');
        }
    )
}

const updateBook = (req, res) => {
    const maSach = req.params.id
    const data = Object.entries(req.body).map(([key, value]) => `${key}="${value}"`).join(', ')
    const sql = `update Sach set ${data} where MaSach = ${maSach}`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.json("error")
        }
        res.json("book updated")
    })
}

const deleteBook = (req, res) => {
    const maSach = req.params.id
    const sql = `delete from Sach where MaSach = "${maSach}"`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.json("error")
        }
        res.json("book deleted")
    })
}

export default { getAllBooks, postBook, updateBook, deleteBook }