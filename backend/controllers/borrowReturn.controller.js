import db from '../config/database.js'

const brDetail = (req, res) => {
  const query = `SELECT 
    PhieuMuon.SoPhieu, 
    PhieuMuon.MaDocGia, 
    PhieuMuon.NgayMuon, 
    ChiTietMuon.MaSach, 
    ChiTietMuon.NgayTra,
    ChiTietMuon.TrangThai
FROM 
    ChiTietMuon 
JOIN 
    PhieuMuon 
ON 
    ChiTietMuon.SoPhieu = PhieuMuon.SoPhieu
JOIN 
    Sach 
ON 
    ChiTietMuon.MaSach = Sach.MaSach
ORDER BY 
    ChiTietMuon.SoPhieu DESC`

  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};
const borrowBook = (req, res) => {
  const { MaDocGia, NgayMuon, MaSach } = req.body;

  // Query to check reader's status
  const checkReaderStatusQuery = `SELECT TrangThai FROM DocGia WHERE MaDocGia = ?`;

  db.query(checkReaderStatusQuery, [MaDocGia], (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length === 0) {
      return res.status(404).send('Reader not found');
    }

    const readerStatus = results[0].TrangThai;

    // Check if reader is active
    if (readerStatus === 'không sử dụng') {
      return res.send('Reader is inactive, cannot borrow books');
    }

    // If reader is active, proceed to borrow books
    const borrowQuery = `INSERT INTO PhieuMuon (MaDocGia, NgayMuon) VALUES (?, ?)`;

    db.query(borrowQuery, [MaDocGia, NgayMuon], (err, result) => {
      if (err) return res.status(500).send(err);
      const SoPhieu = result.insertId; // Get the auto-incremented SoPhieu
      const detailValues = MaSach.map((sach) => [SoPhieu, sach]); // Map MaSach array to array of arrays

      const detailQuery = `INSERT INTO ChiTietMuon (SoPhieu, MaSach) VALUES ?`;

      db.query(detailQuery, [detailValues], (err, result) => {
        if (err) return res.status(500).send(err);
        const updateQuery = `UPDATE Sach SET TrangThai = 'mượn' WHERE MaSach IN (?)`;

        db.query(updateQuery, [MaSach], (err, result) => {
          if (err) return res.status(500).send(err);
          res.send('Book(s) borrowed successfully!');
        });
      });
    });
  });
};

// const borrowBook = (req, res) => {
//   const { MaDocGia, NgayMuon, MaSach } = req.body;
//   const isValid = (MaDocGia) => {
//     db.query(`Select TrangThai from DocGia where MaDocGia = ?`, [MaDocGia], (err, res) => {
//       if (err) return console.log(err)
//       return console.log(res.data)
//     })
//   }
//   console.log(isValid(MaDocGia))
//   const borrowQuery = `INSERT INTO PhieuMuon (MaDocGia, NgayMuon) VALUES (?, ?)`;

//   db.query(borrowQuery, [MaDocGia, NgayMuon], (err, result) => {
//     if (err) return res.status(500).send(err);
//     const SoPhieu = result.insertId; // Get the auto-incremented SoPhieu
//     const detailValues = MaSach.map((sach) => [SoPhieu, sach]); // Map MaSach array to array of arrays

//     const detailQuery = `INSERT INTO ChiTietMuon (SoPhieu, MaSach) VALUES ?`;

//     db.query(detailQuery, [detailValues], (err, result) => {
//       if (err) return res.status(500).send(err);
//       const updateQuery = `UPDATE Sach SET TrangThai = 'mượn' WHERE MaSach IN (?)`;

//       db.query(updateQuery, [MaSach], (err, result) => {
//         if (err) return res.status(500).send(err);
//         res.send('Book(s) borrowed successfully!');
//       });
//       // res.send('Book(s) borrowed successfully!');
//     });
//   });
// };

const returnBook = (req, res) => {
  const { SoPhieu, MaSach, NgayTra, TrangThai } = req.body;

  // Query to update the return date in ChiTietMuon table
  const returnQuery = `UPDATE ChiTietMuon SET NgayTra = ? , TrangThai = ? WHERE SoPhieu = ? AND MaSach = ?`;

  // Query to update the status in Sach table
  const updateStatusQuery = `UPDATE Sach SET TrangThai = ? WHERE MaSach = ?`;

  // Begin a transaction
  db.query(returnQuery, [NgayTra, TrangThai, SoPhieu, MaSach], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Execute the second query
    db.query(updateStatusQuery, [TrangThai, MaSach], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.send('Book returned and status updated successfully!');
    });
  });
};

const searchDetail = (req, res) => {
  const { SoPhieu, MaDocGia, MaSach } = req.query;
  let sql = `
        SELECT ctm.SoPhieu, ctm.MaSach, ctm.NgayTra, pm.MaDocGia, pm.NgayMuon
        FROM ChiTietMuon ctm
        JOIN PhieuMuon pm ON ctm.SoPhieu = pm.SoPhieu
        WHERE 1=1
    `;

  if (SoPhieu) {
    sql += ` AND ctm.SoPhieu = ${db.escape(SoPhieu)}`;
  }
  if (MaDocGia) {
    sql += ` AND pm.MaDocGia = ${db.escape(MaDocGia)}`;
  }
  if (MaSach) {
    sql += ` AND ctm.MaSach = ${db.escape(MaSach)}`;
  }

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json('error');
    } else {
      res.json(result);
    }
  });
};

export default { borrowBook, returnBook, brDetail, searchDetail }