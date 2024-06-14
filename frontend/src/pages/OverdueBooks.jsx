
import { useState, useContext, createContext } from 'react'
import Table from '../components/Table'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const OverdueBooksContext = createContext()
const OverdueBooks = () => {
    const [rowData, setRowData] = useState({})
    const [api, setApi] = useState(`${BACKEND_URL}/statistic/overdue-books`)
    return (
        <>
            <OverdueBooksContext.Provider value={{ rowData, setRowData, api, setApi }}>
                <h3 className='pt-2'>Thống kê quá hạn</h3>
                {/* <BookForm /> */}
                <Table api={api} context={OverdueBooksContext} />
            </OverdueBooksContext.Provider>
        </>
    )
}
export { OverdueBooksContext }
export default OverdueBooks