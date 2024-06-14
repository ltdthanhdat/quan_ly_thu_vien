import axios from "axios"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const InsertBook = () => {
    const [show, setShow] = useState(false)
    const [data, setData] = useState({})
    const [publishers, setPublishers] = useState([]);
    const [category, setCategory] = useState(["Trinh thám", "Kinh dị", "Khoa học", "Pháp luật", "Tiểu thuyết", "Nuôi dạy con", "Kinh tế", "Thiếu nhi", "Văn học"]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/publishers`)
            .then(res => {
                setPublishers(res.data);
            })
            .catch(error => {
                console.log(error)
            });
    }, []);
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = (data) => {
        data["TrangThai"] = "còn"
        if (data.TenSach) {

            axios.post(`${BACKEND_URL}/books`, data)
                .then(res => {
                    setData(res.data)
                    reset()
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <>
            <h3 className="pt-2">Thêm sách</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group py-1 py-1">
                    <label>Tên sách</label>
                    <input className="form-control" type="text" {...register("TenSach")} />
                </div>
                <div className="form-group py-1">
                    <label>Thể loại</label>
                    <select className="form-control" type="text" {...register("TheLoai")} >
                        <option value="">Chọn thể loại</option>
                        {category.map(item => <option value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="form-group py-1">
                    <label>Tác giả</label>
                    <input className="form-control" type="text" {...register("TacGia")} />
                </div>
                <div className="form-group py-1">
                    <label>Nhà xuất bản</label>
                    <select className="form-control" type="text" {...register("MaNXB")} >
                        <option value="">Chọn nhà xuất bản</option>
                        {publishers.map(item => <option value={item.MaNXB}>{item.TenNXB}</option>)}
                    </select>
                </div>
                <div className="form-group py-1">
                    <label>Vị trí</label>
                    <input className="form-control" type="text" {...register("ViTri")} />
                </div>
                <div className="form-group py-1">
                    <button className="btn btn-primary" type="submit" onClick={() => setShow(true)}>Submit</button>
                </div>
            </form>


            {show && data.TenSach && (<div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Đã thêm sách</h5>
                        </div>
                        <div className="modal-body">
                            <p>Mã sách: {data.MaSach}</p>
                            <p>Tên sách: {data.TenSach}</p>
                            <p>Thể loại: {data.TheLoai}</p>
                            <p>Tác giả: {data.TacGia}</p>
                            <p>Mã nhà xuất bản: {data.MaNXB}</p>
                            <p>Vị trí: {data.ViTri}</p>
                            {/* <p>Trạng thái: {data.TrangThai}</p> */}
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