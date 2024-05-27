import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"

const CreateUser = () => {
    const [show, setShow] = useState(false)
    const [data, setData] = useState({})
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        data["TrangThai"] = "sử dụng"
        axios.post('http://localhost:3000/readers', data)
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <h1>Tạo thẻ độc giả</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Họ tên</label>
                    <input className="form-control" type="text" {...register("HoTen")} />
                </div>
                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input className="form-control" type="text" {...register("DiaChi")} />
                </div>
                <div className="form-group">
                    <label>Số điện thoại</label>
                    <input className="form-control" type="text" {...register("SDT")} />
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
export default CreateUser