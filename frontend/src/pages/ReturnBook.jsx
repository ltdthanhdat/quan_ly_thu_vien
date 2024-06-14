import { useState, useContext, createContext } from 'react'
import Table from '../components/Table'
import ReturnBookForm from '../components/Forms/ReturnBook'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const ReturnContext = createContext()
const ReturnBook = () => {
    const [rowData, setRowData] = useState({})
    const [api, setApi] = useState(`${BACKEND_URL}/borrow-return/detail`)
    return (
        <>
            <ReturnContext.Provider value={{ rowData, setRowData, api, setApi }}>
                <h3>Trả sách</h3>
                <ReturnBookForm />
                <Table api={api} context={ReturnContext} />
            </ReturnContext.Provider>
        </>
    )
}
export { ReturnContext }
export default ReturnBook