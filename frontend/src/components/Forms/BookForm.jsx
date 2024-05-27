import { useForm } from "react-hook-form"
import { useContext, useEffect } from "react"
import { BookContext } from "../../pages/Books"
const BookForm = () => {
    let { rowData, setRowData } = useContext(BookContext)

    const { register, handleSubmit, setValue, reset } = useForm()

    useEffect(() => {
        setValue("MaSach", rowData.MaSach)
        setValue("TenSach", rowData.TenSach)
        setValue("TacGia", rowData.TacGia)
        setValue("TheLoai", rowData.TheLoai)
        setValue("NhaXuatBan", rowData.MaNXB)
        setValue("TrangThai", rowData.TrangThai)
    }, [rowData])

    const onSubmit = (formData) => {
        // setValue(rowData)
        // setRowData(rowData)
        console.log(formData)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">

                <div className="form-group col-3">
                    <label>Mã sách</label>
                    <input className="form-control" type="text" {...register("MaSach")} />
                </div>
                <div className="form-group col">
                    <label>Tên sách</label>
                    <input className="form-control" type="text" {...register("TenSach")} />
                </div>
            </div>
            <div className="form-group">
                <label>Thể loại</label>
                <input className="form-control" type="text" {...register("TheLoai")} />
            </div>
            <div className="form-group">
                <label>Tác giả</label>
                <input className="form-control" type="text" {...register("TacGia")} />
            </div>
            <div className="form-group">
                <label>Nhà xuất bản</label>
                <input className="form-control" type="text" {...register("NhaXuatBan")} />
            </div>
            <div className="form-group">
                <label>Trạng thái</label>
                <input className="form-control" type="text" {...register("TrangThai")} />
            </div>
            <div className="form-group">
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default BookForm