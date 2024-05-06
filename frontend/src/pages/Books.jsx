const books = [{
    MaSach: 1,
    TenSach: 'sach 1',
    TheLoai: 'trinh tham',
    TacGia: 'victor',
    MaNXB: 2
}, {
    MaSach: 2,
    TenSach: 'sach 2',
    TheLoai: 'vien tuong',
    TacGia: 'hugo',
    MaNXB: 3
}, {
    MaSach: 2,
    TenSach: 'sach 2',
    TheLoai: 'vien tuong',
    TacGia: 'hugo',
    MaNXB: 3
}, {
    MaSach: 2,
    TenSach: 'sach 2',
    TheLoai: 'vien tuong',
    TacGia: 'hugo',
    MaNXB: 3
}]
const Books = () => {
    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

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
                                let row = [<th scope="row">{books[i].MaSach}</th>].concat(Object.values(books[i]).slice(1, 5).map(item => <td>{item}</td>))
                                arr.push(<tr>{row}</tr>)
                            }
                            return arr
                        })()
                    }
                </tbody>
            </table>
        </>
    )
}

export default Books