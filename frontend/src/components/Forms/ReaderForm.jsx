import { useForm } from "react-hook-form"
import { useContext } from "react"
import { ReaderContext } from "../../pages/Readers"
const ReaderForm = () => {
    let { rowData, setRowData } = useContext(ReaderContext)

    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Mã độc giả</label>
                <input className="form-control" type="text" value={rowData.MaDocGia} {...register("MaSach")} />
            </div>
            <div className="form-group">
                <label>Họ tên</label>
                <input className="form-control" type="text" value={rowData.HoTen} {...register("TenSach")} />
            </div>
            <div className="form-group">
                <label>Địa chỉ</label>
                <input className="form-control" type="text" value={rowData.DiaChi} {...register("TheLoai")} />
            </div>
            <div className="form-group">
                <label>Số điện thoại</label>
                <input className="form-control" type="text" value={rowData.SDT} {...register("TacGia")} />
            </div>
            <div className="form-group">
                <label>Trạng thái</label>
                <input className="form-control" type="text" value={rowData.TrangThai} {...register("NhaXuatBan")} />
            </div>
            <div className="form-group">
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default ReaderForm