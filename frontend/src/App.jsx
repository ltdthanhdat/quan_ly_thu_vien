import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Books from './pages/Books'
import Readers from './pages/Readers'
import CreateUser from './pages/CreateUser'
import './index.css'
import InsertBook from './pages/InsertBook'

const App = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggle = () => {
    setIsOpen(!isOpen)
  }


  return (
    <>
      <div className="app row">
        <nav className={`collapse w-30 vh-100 bg-light col-xs-10 col-sm-2 p-4 ${isOpen ? 'show' : ''}`}>
          <div className='pb-3'><Link className='text-decoration-none text-primary h6' to="/">Home</Link></div>

          <h6>Quản lý độc giả</h6>
          <div><Link className='text-decoration-none text-muted' to="/lam-the-thu-vien">Làm thẻ thư viện</Link></div>
          <div><Link className='text-decoration-none text-muted' to="/doc-gia">Quản lý thông tin</Link></div>
          <br />

          <h6>Quản lý sách</h6>
          <div><Link className='text-decoration-none text-muted' to="/them-sach">Cập nhật sách mới</Link></div>
          <div><Link className='text-decoration-none text-muted' to="/sach">Tìm kiếm sách</Link></div>
          <br />

          <h6>Quản lý trả, mượn</h6>
          <div><Link className='text-decoration-none text-muted' to="/">Mượn sách</Link></div>
          <div><Link className='text-decoration-none text-muted' to="/">Trả sách</Link></div>
          <div><Link className='text-decoration-none text-muted' to="/">Gia hạn sách</Link></div>
          <br />

          <h6>Báo cáo thống kê</h6>
          <div><Link className='text-decoration-none text-muted' to="/">Thống kê sách mượn</Link></div>
          <div><Link className='text-decoration-none text-muted' to="/">Thống kê sách còn</Link></div>
          <div><Link className='text-decoration-none text-muted' to="/">Thống kê người mượn</Link></div>
          <div><Link className='text-decoration-none text-muted' to="/">Thống kê quá hạn</Link></div>
        </nav>

        <div className='vh-100 bg-body col-xs-2 col-sm-10'>
          <div>
            <button className='bg-info' onClick={toggle}>Menu</button>
          </div>
          <Routes>
            <Route path="/sach" element={<Books />} />
            <Route path="/doc-gia" element={<Readers />} />
            <Route path="/lam-the-thu-vien" element={<CreateUser />} />
            <Route path="/them-sach" element={<InsertBook />} />
          </Routes>
        </div>

      </div>
    </>
  )
}

export default App
