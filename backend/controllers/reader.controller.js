import pool from "../config/database.js"

const getAllReaders = (req, res) => {
    pool.query(
        'SELECT * FROM DocGia',
        (err, rows) => {
            if (err) {
                console.log(err)
            }
            res.json(rows);
        }
    )
}

const postReader = (req, res) => {
    res.send('reader posted')
}

const updateReader = (req, res) => {
    res.send('reader updated')
}

export default { getAllReaders, postReader, updateReader }