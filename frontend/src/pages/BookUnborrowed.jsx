import { useState, useContext, createContext } from 'react'
import Table from '../components/Table'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const BookUnborrowedContext = createContext()
const BookUnborrowed = () => {
    const [rowData, setRowData] = useState({})
    const [api, setApi] = useState(`${BACKEND_URL}/statistic/book-unborrowed`)
    return (
        <>
            <BookUnborrowedContext.Provider value={{ rowData, setRowData, api, setApi }}>
                <h3 className='pt-2'>Thống kê sách chưa mượn</h3>
                <Table api={api} context={BookUnborrowedContext} />
            </BookUnborrowedContext.Provider>
        </>
    )
}
export { BookUnborrowedContext }
export default BookUnborrowed