import { useForm } from "react-hook-form"
import { useContext, useEffect, useState } from "react"
import { ReaderContext } from "../../pages/Readers"
import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const ReaderForm = () => {
    let { rowData, setRowData, api, setApi } = useContext(ReaderContext)
    const { register, handleSubmit, setValue, reset } = useForm()
    const { register: register2, handleSubmit: handleSubmit2, reset: reset2 } = useForm()

    useEffect(() => {
        setValue("MaDocGia", rowData.MaDocGia)
        setValue("HoTen", rowData.HoTen)
        setValue("DiaChi", rowData.DiaChi)
        setValue("SDT", rowData.SDT)
        setValue("TrangThai", rowData.TrangThai)
    }, [rowData])

    const onSubmit = (data) => {
        axios.put(`${BACKEND_URL}/readers/${rowData.MaDocGia}`, data)
            .then(res => {
                api = api + ' '
                setApi(api)
                reset()
            })
            .catch(err => console.log(err))
    }

    const handleDelete = () => {
        axios.delete(`${BACKEND_URL}/readers/${rowData.MaDocGia}`)
            .then(res => {
                console.log(res)
                api = api + ' '
                setApi(api)
                reset()
            })
            .catch(err => console.log(err))
    }
    const handleSearch = (data) => {
        setApi(`${BACKEND_URL}/readers/search?MaDocGia=${data.MaDocGia}&HoTen=${data.HoTen}`)
        reset2()
    }
    return (
        <>

            <form onSubmit={handleSubmit2(onSubmit)}>
                <div className="row">
                    <div className="col pe-4">
                        <div className="form-group py-1">
                            <label>Mã độc giả</label>
                            <input className="form-control" type="text" disabled {...register("MaDocGia")} />
                        </div>
                        <div className="form-group py-1">
                            <label>Họ tên</label>
                            <input className="form-control" type="text" {...register("HoTen")} />
                        </div>
                        <div className="form-group py-1">
                            <label>Địa chỉ</label>
                            <input className="form-control" type="text" {...register("DiaChi")} />
                        </div>
                    </div>

                    <div className="col px-4">
                        <div className="form-group py-1">
                            <label>Số điện thoại</label>
                            <input className="form-control" type="text" {...register("SDT")} />
                        </div>
                        <div className="form-group py-1">
                            <label>Trạng thái</label>
                            <select className="form-control" type="text" {...register("TrangThai")} >
                                <option value="">Chọn trạng thái</option>
                                <option value='sử dụng'>sử dụng</option>
                                <option value='không sử dụng'>không sử dụng</option>
                            </select>
                        </div>
                        <div className="form-group pt-3 pd-1 my-2">
                            <button className="btn btn-primary me-2" type="submit" >Sửa</button>
                            <button className="btn btn-danger" type="button" onClick={handleDelete}>Xóa</button>
                        </div>
                    </div>
                </div>
            </form >
            <hr />
            <form onSubmit={handleSubmit2(handleSearch)}>
                <div className="d-flex align-items-end">
                    <div className="form-group me-3">
                        <label>Mã độc giả</label>
                        <input className="form-control" type="text" {...register2("MaDocGia")} />
                    </div>
                    <div className="form-group me-3">
                        <label>Họ tên</label>
                        <input className="form-control" type="text" {...register2("HoTen")} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Tìm kiếm</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ReaderForm