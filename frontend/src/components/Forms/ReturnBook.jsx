import { useForm } from "react-hook-form"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ReturnContext } from "../../pages/ReturnBook";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const formatDate = (dateStr) => {
    let formattedDate = ""
    if (dateStr) {

        // Tách ngày, tháng, năm từ chuỗi ban đầu
        const [day, month, year] = dateStr.split('-');

        // Tạo định dạng mới
        formattedDate = `${year}-${month}-${day}`;
    }
    return formattedDate;
    // }
    // return ""
}
const ReturnBook = () => {
    const { register, handleSubmit, setValue, reset } = useForm()
    const { register: registerSearch, handleSubmit: handleSearch, reset: resetSearch } = useForm()

    const [status, setStatus] = useState(["còn", "hỏng", "mất"])
    let { api, setApi, rowData } = useContext(ReturnContext)
    useEffect(() => {
        setValue("SoPhieu", rowData.SoPhieu)
        setValue("MaSach", rowData.MaSach)
        setValue("NgayTra", formatDate(rowData.NgayTra))
        setValue("TrangThai", rowData.TrangThai)
    }, [rowData])
    const onSubmit = async (data) => {
        try {
            console.log(data)
            const response = await axios.post(`${BACKEND_URL}/borrow-return/return`, data);
            reset(); // Clear the form after successful submission
            api += ' '
            setApi(api)
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    const onSearch = async (data) => {
        setApi(`${BACKEND_URL}/borrow-return/search?SoPhieu=${data.SoPhieu}&MaDocGia=${data.MaDocGia}&MaSach=${data.MaSach}`)
        resetSearch()
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col pe-4">
                        <div className="form-group py-1">
                            <label htmlFor="soPhieu">Số phiếu</label>
                            <input id="soPhieu" className="form-control"{...register("SoPhieu")} />
                        </div>
                        <div className="form-group py-1">
                            <label htmlFor="ngayTra">Ngày trả</label>
                            <input id="ngayTra" className="form-control" type="date" {...register("NgayTra")} />
                        </div>
                    </div>
                    <div className="col px-4">
                        <div className="form-group py-1">
                            <label htmlFor="maSach">Mã sách</label>
                            <input id="maSach" className="form-control"{...register("MaSach")} />
                        </div>
                        <div className="form-group py-1">
                            <label htmlFor="tinhTrang">Tình trạng</label>
                            {/* <input id="tinhTrang" className="form-control"{...register("TinhTrang")} /> */}
                            <select className="form-control" type="text" {...register("TrangThai")} >
                                <option value="">Chọn trạng thái</option>
                                {status.map(item => <option value={item}>{item}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="pt-1">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
            <hr />

            <form onSubmit={handleSearch(onSearch)}>
                <div className="row align-items-end">
                    <div className="col-3">
                        <div className="form-group py-1">
                            <label htmlFor="searchSoPhieu">Số phiếu</label>
                            <input id="searchSoPhieu" className="form-control" {...registerSearch("SoPhieu")} />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group py-1">
                            <label htmlFor="searchMaDocGia">Mã độc giả</label>
                            <input id="searchMaDocGia" className="form-control" {...registerSearch("MaDocGia")} />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group py-1">
                            <label htmlFor="searchMaSach">Mã sách</label>
                            <input id="searchMaSach" className="form-control" {...registerSearch("MaSach")} />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group py-1">
                            <button className="btn btn-primary" type="submit">Tìm kiếm</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ReturnBook
