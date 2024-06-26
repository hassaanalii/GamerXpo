import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url) {
        console.log('get', url);
        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response:', json);

                resolve(json);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },

    post: async function(url, data) {
        console.log('post', url, data);

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response:', json);

                resolve(json);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    patch: async function(url, data) {
        console.log('patch', url, data);
        const token = await getAccessToken();
    
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response:', json);
                resolve(json);
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            });
        });
    },
    getWithoutToken: async function (url) {
        console.log('get', url);
        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response:', json);

                resolve(json);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },

    postWithoutToken: async function(url, data) {
        console.log('post', url, data);

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response:', json);

                resolve(json);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
}

export default apiService;
