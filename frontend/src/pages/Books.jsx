import axios from 'axios'
import { useState, useContext, createContext } from 'react'
import Table from '../components/Table'
import BookForm from '../components/Forms/BookForm'

const BookContext = createContext()
const Books = () => {
    const [rowData, setRowData] = useState({})
    return (
        <>
            <BookContext.Provider value={{ rowData, setRowData }}>
                <h1>Quản lý sách</h1>
                <BookForm />
                <Table api='http://localhost:3000/books' context={BookContext} />
            </BookContext.Provider>
        </>
    )
}
export { BookContext }
export default Books