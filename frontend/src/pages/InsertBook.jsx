import axios from "axios"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

const InsertBook = () => {
    const [show, setShow] = useState(false)
    const [data, setData] = useState({})
    const [publishers, setPublishers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/publishers')
            .then(res => {
                setPublishers(res.data);
            })
            .catch(error => {
                console.log(error)
            });
    }, []);
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        // data["TrangThai"] = "sử dụng"
        // axios.post('http://localhost:3000/readers', data)
        // .then(res => {
        //     setData(res.data)
        // })
        // .catch(err => console.log(err))
        console.log(data)
    }
    return (
        <>
            <h6>Thêm sách</h6>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Tên sách</label>
                    <input className="form-control" type="text" {...register("TenSach")} />
                </div>
                <div className="form-group">
                    <label>Thể loại</label>
                    <select className="form-control" type="text" {...register("TheLoai")} >
                        <option value="">Choose an option</option>
                        <option value="Trinh thám">Trinh thám</option>
                        <option value="Kinh dị">Kinh dị</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Tác giả</label>
                    <input className="form-control" type="text" {...register("TacGia")} />
                </div>
                <div className="form-group">
                    <label>Nhà xuất bản</label>
                    <select className="form-control" type="text" {...register("MaNXB")} >
                        <option value="">Chọn nhà xuất bản</option>
                        {publishers.map(item => <option value={item.MaNXB}>{item.TenNXB}</option>)}

                    </select>
                </div>
                <div className="form-group">
                    <label>Vị trí</label>
                    <input className="form-control" type="text" {...register("ViTri")} />
                </div>
                <div className="form-group">
                    <label>Trạng thái</label>
                    <input className="form-control" type="text" {...register("TrangThai")} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit" onClick={() => setShow(true)}>Submit</button>
                </div>
            </form>


            {show && (<div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Đã thêm độc giả</h5>
                        </div>
                        <div className="modal-body">
                            <p>Mã độc giả: {data.MaDocGia}</p>
                            <p>Họ tên: {data.HoTen}</p>
                            <p>Địa chỉ: {data.DiaChi}</p>
                            <p>Số điện thoại: {data.SDT}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>)}
        </>

    )
}
export default InsertBook