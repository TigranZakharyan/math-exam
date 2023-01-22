import request from "src/utils/request";

export const fetchAll = () => new Promise((res, rej) => {
    request.get('/quizes')
    .then(({ data }) => res(data))
    .catch((err) => rej(err))
});

export const create = (data) => new Promise((res, rej) => {
    request.post('/quizes', data)
    .then(({ data }) => res(data))
    .catch((err) => rej(err))
});
