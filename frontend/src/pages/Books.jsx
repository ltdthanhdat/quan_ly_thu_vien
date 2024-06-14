import { useState, useContext, createContext } from 'react'
import Table from '../components/Table'
import BookForm from '../components/Forms/BookForm'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const BookContext = createContext()
const Books = () => {
    const [rowData, setRowData] = useState({})
    const [api, setApi] = useState(`${BACKEND_URL}/books`)
    return (
        <>
            <BookContext.Provider value={{ rowData, setRowData, api, setApi }}>
                <h3 className='pt-2'>Quản lý sách</h3>
                <BookForm />
                <Table api={api} context={BookContext} />
            </BookContext.Provider>
        </>
    )
}
export { BookContext }
export default Books