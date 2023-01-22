import request from '../utils/request';

export const fetchMe = () => new Promise((res, rej) => {
    request.get('/users/admin')
    .then(({ data }) => res(data))
    .catch((err) => rej(err))
});

export const login = (body) => (new Promise((res, rej) => {
    request.post('/auth/admin', body)
    .then(({ data }) => {
        localStorage.setItem('access_token', `Bearer ${data.access_token}`);
        request.defaults.headers['Authorization'] = localStorage.getItem('access_token');
        request.get('/users/admin')
        .then(({ data }) => res(data))
        .catch((err) => rej(err))
    })
    .catch((err) => rej(err))
}))
    

    