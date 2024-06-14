import db from "../config/database.js"
const bookBorrowed = (req, res) => {
    const query = `
    SELECT Sach.MaSach, Sach.TenSach, Sach.TacGia, DocGia.MaDocGia, DocGia.HoTen
    FROM ChiTietMuon
    JOIN Sach ON ChiTietMuon.MaSach = Sach.MaSach
    JOIN PhieuMuon ON ChiTietMuon.SoPhieu = PhieuMuon.SoPhieu
    JOIN DocGia ON PhieuMuon.MaDocGia = DocGia.MaDocGia
    WHERE Sach.TrangThai = 'mượn'
  `;

    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(results);
        }
    });
}

const bookUnborrowed = (req, res) => {
    const query = `
    SELECT Sach.MaSach, Sach.TenSach, Sach.TacGia
    FROM Sach
    WHERE Sach.TrangThai = "còn"
  `;

    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(results);
        }
    });
}

const borrower = (req, res) => {
    const query = `
        SELECT 
            DocGia.MaDocGia,
            DocGia.HoTen,
            DocGia.DiaChi,
        COUNT(PhieuMuon.SoPhieu) AS SoSachMuon
        FROM 
            DocGia
        LEFT JOIN 
            PhieuMuon ON DocGia.MaDocGia = PhieuMuon.MaDocGia
        LEFT JOIN 
            ChiTietMuon ON PhieuMuon.SoPhieu = ChiTietMuon.SoPhieu
        LEFT JOIN
            Sach ON ChiTietMuon.MaSach = Sach.MaSach
        WHERE
            Sach.TrangThai = 'mượn'
        GROUP BY 
            DocGia.MaDocGia, DocGia.HoTen, DocGia.DiaChi`
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(results);
        }
    });
}

const overdueBooks = (req, res) => {
    const query = `
    SELECT Sach.MaSach, Sach.TenSach, Sach.TacGia, DocGia.MaDocGia, DocGia.HoTen, PhieuMuon.NgayMuon
    FROM ChiTietMuon
    JOIN Sach ON ChiTietMuon.MaSach = Sach.MaSach
    JOIN PhieuMuon ON ChiTietMuon.SoPhieu = PhieuMuon.SoPhieu
    JOIN DocGia ON PhieuMuon.MaDocGia = DocGia.MaDocGia
    WHERE PhieuMuon.NgayMuon < DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND ChiTietMuon.NgayTra IS NULL
  `;

    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json(results);
        }
    });
}
export default { bookBorrowed, bookUnborrowed, borrower, overdueBooks }