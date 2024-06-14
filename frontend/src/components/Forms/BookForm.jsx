import axios from "axios"
import { useForm } from "react-hook-form"
import { useContext, useEffect, useState } from "react"
import { BookContext } from "../../pages/Books"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const BookForm = () => {
    let { rowData, setRowData, api, setApi } = useContext(BookContext)

    const { register, handleSubmit, setValue, reset } = useForm()
    const { register: registerSearch, handleSubmit: handleSubmitSearch, reset: reset2 } = useForm()

    const [publishers, setPublishers] = useState([]);
    const [category, setCategory] = useState(["Trinh thám", "Kinh dị", "Khoa học", "Pháp luật", "Tiểu thuyết", "Nuôi dạy con", "Kinh tế", "Thiếu nhi", "Văn học"]);
    const [status, setStatus] = useState(['còn', 'mất', 'hỏng', 'mượn']);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/publishers`)
            .then(res => {
                setPublishers(res.data);
            })
            .catch(error => {
                console.log(error)
            });
        setValue("MaSach", rowData.MaSach)
        setValue("TenSach", rowData.TenSach)
        setValue("TacGia", rowData.TacGia)
        setValue("TheLoai", rowData.TheLoai)
        setValue("TenNXB", rowData.TenNXB)
        setValue("TrangThai", rowData.TrangThai)
        setValue("ViTri", rowData.ViTri)
    }, [rowData])

    const onSubmit = (data) => {
        axios.post(`${BACKEND_URL}/publishers/find`, { TenNXB: data.TenNXB })
            .then(res => {
                delete data.TenNXB
                let data2 = { ...data, ...res.data }
                axios.put(`${BACKEND_URL}/books/${rowData.MaSach}`, data2)
                    .then(res => {
                        api = api + ' '
                        setApi(api)
                        reset()
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const handleDelete = () => {
        axios.delete(`${BACKEND_URL}/books/${rowData.MaSach}`)
            .then(res => {
                api = api + ' '
                setApi(api)
                reset()
            })
            .catch(err => console.log(err))
    }

    const handleSearch = (data) => {
        setApi(`${BACKEND_URL}/books/search?MaSach=${data.MaSach}&TacGia=${data.TacGia}&TenSach=${data.TenSach}`)
        reset2()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col pe-4">
                        <div className="form-group py-1">
                            <label>Mã sách</label>
                            <input className="form-control" type="text" {...register("MaSach")} />
                        </div>
                        <div className="form-group py-1">
                            <label>Tên sách</label>
                            <input className="form-control" type="text" {...register("TenSach")} />
                        </div>
                        <div className="form-group py-1">
                            <label>Thể loại</label>
                            {/* <input className="form-control" type="text" {...register("TheLoai")} /> */}
                            <select className="form-control" type="text" {...register("TheLoai")} >
                                <option value="">Chọn thể loại</option>
                                {category.map(item => <option value={item}>{item}</option>)}
                            </select>
                        </div>
                        <div className="form-group py-1">
                            <label>Vị trí</label>
                            <input className="form-control" type="text" {...register("ViTri")} />
                        </div>
                    </div>

                    <div className="col px-4">
                        <div className="form-group py-1">

                            <label>Tác giả</label>
                            <input className="form-control" type="text" {...register("TacGia")} />
                        </div>
                        <div className="form-group py-1">
                            <label>Nhà xuất bản</label>
                            {/* <input className="form-control" type="text" {...register("MaNXB")} /> */}
                            <select className="form-control" type="text" {...register("TenNXB")} >
                                <option value="">Chọn nhà xuất bản</option>
                                {publishers.map(item => <option value={item.TenNXB}>{item.TenNXB}</option>)}
                            </select>
                        </div>
                        <div className="form-group py-1">
                            <label>Trạng thái</label>
                            {/* <input className="form-control" type="text" {...register("TrangThai")} /> */}
                            <select className="form-control" type="text" {...register("TrangThai")} >
                                <option value="">Chọn trạng thái</option>
                                {status.map(item => <option value={item}>{item}</option>)}
                            </select>
                        </div>
                        {/* <div className="form-group py-1"> */}
                        <div className="form-group pt-4 pd-1">
                            <button className="btn btn-primary me-2" type="submit">Sửa</button>
                            <button className="btn btn-danger" type="button" onClick={handleDelete}>Xóa</button>
                        </div>
                    </div>
                </div>
            </form>
            <hr />
            <form onSubmit={handleSubmitSearch(handleSearch)}>
                <div className="d-flex align-items-end">
                    <div className="form-group me-3">
                        <label>Mã sách</label>
                        <input className="form-control" type="text" {...registerSearch("MaSach")} />
                    </div>
                    <div className="form-group me-3">
                        <label>Tên sách</label>
                        <input className="form-control" type="text" {...registerSearch("TenSach")} />
                    </div>
                    <div className="form-group me-3">
                        <label>Tác giả</label>
                        <input className="form-control" type="text" {...registerSearch("TacGia")} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Tìm kiếm</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default BookForm