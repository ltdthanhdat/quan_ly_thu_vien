import { useState, useContext, createContext } from 'react'
import Table from "../components/Table"
import ReaderForm from '../components/Forms/ReaderForm'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const ReaderContext = createContext()
const Readers = () => {
    const [rowData, setRowData] = useState({})
    const [api, setApi] = useState(`${BACKEND_URL}/readers`)
    return (
        <>
            <ReaderContext.Provider value={{ rowData, setRowData, api, setApi }}>
                <h3 className='pt-2'>Quản lý độc giả</h3>
                <ReaderForm />
                <Table api={api} context={ReaderContext} />
            </ReaderContext.Provider>
        </>
    )
}
export { ReaderContext }
export default Readers