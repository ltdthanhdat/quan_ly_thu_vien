const getAllReaders = (req, res) => {
    res.send('list readers')
}

const postReader = (req, res) => {
    res.send('reader posted')
}

const updateReader = (req, res) => {
    res.send('reader updated')
}

export default { getAllReaders, postReader, updateReader }