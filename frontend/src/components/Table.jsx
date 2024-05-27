import axios from "axios"
import { useContext, useEffect, useState } from "react"

const Table = ({ api, context }) => {
    let { rowData, setRowData } = useContext(context)

    const [books, setBooks] = useState([{}])
    const handleOnclick = (data) => {
        setRowData(data)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(api)
                setBooks(data.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, []
    )

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        {Object.keys(books[0]).map(item => (<th>{item}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {
                        (() => {
                            let arr = []
                            for (let i = 0; i < books.length; i++) {
                                let row = Object.values(books[i]).map(item => {
                                    return <td>{item}</td>
                                })
                                arr.push(<tr onClick={() => handleOnclick(books[i])}>{row}</tr>)
                            }
                            return arr
                        })()
                    }
                </tbody>
            </table >
        </>
    )
}

export default Table