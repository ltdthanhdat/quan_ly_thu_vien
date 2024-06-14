import { useState, useContext, createContext } from 'react'
import Table from '../components/Table'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const BorrowerContext = createContext()
const Borrower = () => {
    const [rowData, setRowData] = useState({})
    const [api, setApi] = useState(`${BACKEND_URL}/statistic/borrower`)
    return (
        <>
            <BorrowerContext.Provider value={{ rowData, setRowData, api, setApi }}>
                <h3 className='pt-2'>Thống kê người mượn</h3>
                {/* <BookForm /> */}
                <Table api={api} context={BorrowerContext} />
            </BorrowerContext.Provider>
        </>
    )
}
export { BorrowerContext }
export default Borrower