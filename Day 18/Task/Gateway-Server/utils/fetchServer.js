// Use global fetch if available (Node 18+), otherwise lazy-load node-fetch
const _fetch = (typeof fetch !== 'undefined')
    ? fetch
    : ((...args) => import('node-fetch').then(({ default: f }) => f(...args)));

const withTimeout = async (promise, ms = 8000) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(new Error('Request timeout')) , ms);
    try {
        const result = await promise(controller.signal);
        return result;
    } finally {
        clearTimeout(timeout);
    }
}

const fetchPOSTREQUEST = async (url, body) => {
    try {
        const response = await withTimeout((signal) => _fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'username': process.env.USERNAME_SERVER,
                'password': process.env.PASSWORD_SERVER
            },
            body: JSON.stringify(body),
            signal
        }));
        const data = await response.json();
        return data

    } catch (error) {
        console.log(error);
    }
}

const fetchGETREQUEST = async (url) => {
    try {
        const response = await withTimeout((signal) => _fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': process.env.USERNAME_SERVER,
                'password': process.env.PASSWORD_SERVER
            },
            signal
        }));
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

const fetchDELETEREQUEST = async (url) => {
    try {
        const response = await withTimeout((signal) => _fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'username': process.env.USERNAME_SERVER,
                'password': process.env.PASSWORD_SERVER
            },
            signal
        }));
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}


module.exports = { fetchPOSTREQUEST, fetchGETREQUEST, fetchDELETEREQUEST }