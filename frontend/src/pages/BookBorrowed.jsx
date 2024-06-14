import { useState, useContext, createContext } from 'react'
import Table from '../components/Table'
// import BookForm from '../components/Forms/BookForm'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const BookBorrowedContext = createContext()
const BookBorrowed = () => {
    const [rowData, setRowData] = useState({})
    const [api, setApi] = useState(`${BACKEND_URL}/statistic/book-borrowed`)
    return (
        <>
            <BookBorrowedContext.Provider value={{ rowData, setRowData, api, setApi }}>
                <h3 className='pt-2'>Thống kê sách mượn</h3>
                {/* <BookForm /> */}
                <Table api={api} context={BookBorrowedContext} />
            </BookBorrowedContext.Provider>
        </>
    )
}
export { BookBorrowedContext }
export default BookBorrowed