import React, { useState } from 'react';
import axios from 'axios'
import { useForm } from 'react-hook-form';
import "../../../src/index.css"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const BorrowForm = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [bookList, setBookList] = useState([]);

    const addBook = (bookId) => {
        if (bookId) {
            axios.get(`${BACKEND_URL}/books/${bookId}`)
                .then(res => {
                    if (res.data.TrangThai == "còn" && !bookList.includes(bookId)) {
                        setBookList((prev) => [...prev, bookId]);
                        setValue('MaSach', ''); // Reset the bookId input field
                    }
                    else {
                        alert("Sách đã được mượn")
                    }
                })
                .catch(err => console.log(err))
        }
    };

    const onSubmit = async (data) => {
        data.MaSach = bookList; // Add the book list to the form data
        try {
            const response = await axios.post(`${BACKEND_URL}/borrow-return/borrow`, data); // Send form data to API
            if (response.data == "Reader is inactive, cannot borrow books") {
                alert("Độc giả không được mượn sách")
            }
            else {
                reset()
            }
            // reset();
            setBookList([]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group row py-1'>
                <label htmlFor="readerId">Mã độc giả</label>
                <input
                    id="readerId"
                    className='form-control '
                    {...register('MaDocGia', { required: 'Mã độc giả là bắt buộc' })}
                />
                {errors.MaDocGia && <span>{errors.MaDocGia.message}</span>}
            </div>

            <div className='form-group row py-1'>
                <label htmlFor="bookId">Mã sách</label>
                <input
                    id="bookId"
                    className='form-control col'
                    {...register('MaSach')}
                />
                <div className='col-auto'>
                    <button type="button" className='btn btn-primary' onClick={() => addBook(document.getElementById('bookId').value)}>
                        Thêm mã sách
                    </button>
                </div>
            </div>

            <div className='row'>
                <label>Danh sách mã sách:</label>
                <p>{bookList.join(', ')}</p>
            </div>

            <div className='form-group row py-1'>
                <label htmlFor="borrowDate">Ngày mượn</label>
                <input
                    id="borrowDate"
                    className='form-control'
                    type="date"
                    {...register('NgayMuon', { required: 'Ngày mượn là bắt buộc' })}
                />
                {errors.NgayMuon && <span>{errors.NgayMuon.message}</span>}
            </div>
            <div className='py-1'>
                <button type="submit" className='btn btn-primary'>Submit</button>
            </div>
        </form>
    );
};

export default BorrowForm;
