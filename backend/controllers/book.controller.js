import db from '../config/database.js'

const getAllBooks = (req, res) => {
    // const sql = `
    //     SELECT Sach, NhaXuatBan.TenNXB 
    //     FROM Sach 
    //     JOIN NhaXuatBan ON Sach.MaNXB = NhaXuatBan.MaNXB
    // `;
    const sql = `
        SELECT Sach.MaSach, Sach.TenSach, Sach.TheLoai, Sach.TacGia, NhaXuatBan.TenNXB, Sach.ViTri, Sach.TrangThai
        FROM Sach 
        JOIN NhaXuatBan ON Sach.MaNXB = NhaXuatBan.MaNXB
    `;
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
    const sql = 'insert into Sach (TenSach, TheLoai, TacGia, MaNXB, ViTri, TrangThai) values (?, ?, ?, ?, ?, ?)'
    db.query(sql, [req.body.TenSach, req.body.TheLoai, req.body.TacGia, req.body.MaNXB, req.body.ViTri, req.body.TrangThai],
        (err, result) => {
            if (err) {
                console.log(err)
                res.json('error')
            }
            const maSach = result.insertId
            db.query('select * from Sach where MaSach=?', [maSach],
                (err, result) => {
                    res.json(result[0])
                })
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

const getBook = (req, res) => {
    const MaSach = req.params.id;

    const query = 'SELECT * FROM Sach WHERE MaSach = ?';
    db.query(query, [MaSach], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn: ', err);
            res.status(500).send('Đã có lỗi xảy ra khi lấy thông tin sách');
            return;
        }

        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Không tìm thấy sách với mã này');
        }
    });
};

const searchBooks = (req, res) => {
    const { MaSach, TenSach, TacGia } = req.query
    let sql = 'SELECT * FROM Sach WHERE 1=1'
    let values = []

    if (MaSach) {
        sql += ' AND MaSach = ?'
        values.push(MaSach)
    }
    if (TenSach) {
        sql += ' AND TenSach LIKE ?'
        values.push(`%${TenSach}%`)
    }
    if (TacGia) {
        sql += ' AND TacGia LIKE ?'
        values.push(`%${TacGia}%`)
    }

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err)
            res.json('error')
        }
        res.json(result)
    })
}

export default { getAllBooks, postBook, updateBook, deleteBook, getBook, searchBooks }