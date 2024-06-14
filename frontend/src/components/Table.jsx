import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { format, parseISO, isValid } from "date-fns";
const Table = ({ api, context }) => {
    let { rowData, setRowData } = useContext(context)

    const [table, setTable] = useState([{}])
    const handleOnclick = (data) => {
        setRowData(data)
    }
    const formatDates = (data) => {
        return data.map(item => {
            let newItem = { ...item };
            for (let key in newItem) {
                if (typeof newItem[key] === 'string' && isValid(parseISO(newItem[key]))) {
                    // newItem[key] = format(parseISO(newItem[key]), 'yyyy-MM-dd');
                    newItem[key] = format(parseISO(newItem[key]), 'dd-MM-yyyy');
                }
            }
            return newItem;
        });
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(api)
                if (res.data[0]) {
                    const formattedData = formatDates(res.data);
                    setTable(formattedData);
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [api]
    )

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {Object.keys(table[0]).map(item => (<th>{item}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {
                        (() => {
                            let arr = []
                            for (let i = 0; i < table.length; i++) {
                                let row = Object.values(table[i]).map(item => {
                                    return <td>{item}</td>
                                })
                                arr.push(<tr onClick={() => handleOnclick(table[i])}>{row}</tr>)
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