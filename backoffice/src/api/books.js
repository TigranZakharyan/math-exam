import request from "src/utils/request";

export const fetchAll = () => new Promise((res, rej) => {
    request.get('/books')
    .then(({ data }) => res(data))
    .catch((err) => rej(err))
});

export const deleteMany = (data) => new Promise((res, rej) => {
    request.delete('/books', { data })
    .then(({ data }) => res(data))
    .then((err) => rej(err))
});

export const deleteOne = (id) => new Promise((res, rej) => {
    request.delete(`/books/${id}`)
    .then(({ data }) => res(data))
    .then((err) => rej(err))
});

export const create = (data) => new Promise((res, rej) => {
    request.post('/books', data, {
        headers: {
            'Content-Type':'multipart/form-data'
        }
    })
    .then(({ data }) => res(data))
    .then((err) => rej(err))
});

