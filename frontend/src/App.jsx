import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Books from './pages/Books'
import './index.css'

const App = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [width, setWidth] = useState(window.innerWidth)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <div className="app row">
        <nav className={`collapse min-vw-30 vh-100 bg-light col-2 p-4 ${isOpen && width >= 500 ? 'show' : ''}`}>
          <div className='pb-3'><Link className='text-decoration-none text-primary h6' to="/">Home</Link></div>

          <h6>Quản lý độc giả</h6>
          <div><Link className='text-decoration-none text-muted' to="/lam-the-thu-vien">Làm thẻ thư viện</Link></div>
          <div><Link className='text-decoration-none text-muted' to="/quan-ly-thong-tin">Quản lý thông tin</Link></div>
          <br />

          <h6>Quản lý sách</h6>
          <div><Link className='text-decoration-none text-muted' to="/">Cập nhật sách mới</Link></div>
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

        <div className='vh-100 bg-body col'>
          <div>
            <button className='bg-info' onClick={toggle}>Menu</button>
            <h2 className='bg-info-subtle text-center'>{`Title ${width}`}</h2>
          </div>
          <Routes>
            <Route path="/sach" element={<Books />} />
          </Routes>
        </div>

      </div>
    </>
  )
}

export default App
