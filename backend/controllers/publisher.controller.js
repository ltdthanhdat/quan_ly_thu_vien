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

export default { getAllPublishers }