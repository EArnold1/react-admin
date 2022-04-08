const authProvider = {
    login: ({ username, password }) => {
        const request = new Request('http://localhost:5000/api/auth', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }

                return response.json();
            })
            .then((res) => {
                localStorage.setItem('token', res.token);
            })
            .catch((err) => {
                throw new Error('Network error')
            });
    },
    checkError: (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        return Promise.resolve();
    },
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    }
    // ...
};

export default authProvider;