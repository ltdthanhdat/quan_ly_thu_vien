import { useState, useContext, createContext } from 'react'
import Table from "../components/Table"
import ReaderForm from '../components/Forms/ReaderForm'

const ReaderContext = createContext()
const Readers = () => {
    const [rowData, setRowData] = useState({})
    const [api, setApi] = useState("http://localhost:3000/readers")
    return (
        <>
            <ReaderContext.Provider value={{ rowData, setRowData, api, setApi }}>
                <h6>Quản lý độc giả</h6>
                <ReaderForm />
                <Table api={api} context={ReaderContext} />
            </ReaderContext.Provider>
        </>
    )
}
export { ReaderContext }
export default Readers