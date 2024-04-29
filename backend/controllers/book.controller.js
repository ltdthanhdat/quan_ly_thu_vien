import pool from '../config/database.js'

const getAllBooks = (req, res) => {
    const sqlQuery = 'select * from Sach'
    pool.query(
        sqlQuery,
        (err, rows) => {
            if (err) {
                console.log(err)
                res.json('error')
            }
            res.json(rows);
        }
    )
}

const postBook = (req, res) => {
    // const sqlQuery = 'insert into Sach (TenSach, TheLoai, TacGia, MaNXB) values (?, ?, ?, ?)'
    const [TheLoai, TenSach, TacGia, MaNXB] = req.body
    console.log(TheLoai)
    console.log(TenSach)
    console.log(TacGia)
    console.log(MaNXB)
    // pool.query(sqlQuery, [TenSach, TheLoai, TacGia, MaNXB],
    // (err, rows) => {
    // if (err) {
    //             console.log(err)
    //             res.json('error')
    //         }
    //         res.json(rows);
    //     }
    // )
    // res.json('book posted')
}

const updateBook = (req, res) => {
    res.json('book updated')
}

const deleteBook = (req, res) => {
    res.json('book deleted')
}

export default { getAllBooks, postBook, updateBook, deleteBook }