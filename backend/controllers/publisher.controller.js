import db from '../config/database.js'

const getAllPublishers = (req, res) => {
    const sql = 'select * from NhaXuatBan'
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

const findPublisher = (req, res) => {
    const { TenNXB } = req.body; // Giả sử thông tin TenNXB được gửi trong body request

    const sql = 'SELECT MaNXB FROM NhaXuatBan WHERE TenNXB = ?';
    db.query(
        sql,
        [TenNXB],
        (err, result) => {
            if (err) {
                console.log(err);
                res.json('error');
            } else {
                if (result.length > 0) {
                    res.json(result[0]); // Trả về kết quả đầu tiên nếu có
                } else {
                    res.json({ message: 'Không tìm thấy NXB nào với tên này' });
                }
            }
        }
    );
}

export default { getAllPublishers, findPublisher }