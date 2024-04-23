const getAllBooks = (req, res) => {
    res.json('list books')
}

const postBook = (req, res) => {
    res.json('book posted')
}

const updateBook = (req, res) => {
    res.json('book updated')
}

const deleteBook = (req, res) => {
    res.json('book deleted')
}

export default { getAllBooks, postBook, updateBook, deleteBook }