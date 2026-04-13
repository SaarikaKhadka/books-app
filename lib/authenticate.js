const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function setToken(token) {
    localStorage.setItem('access_token', token);
}

export function getToken() {
    try {
        return localStorage.getItem('access_token');
    } catch (e) {
        return null;
    }
}

export function removeToken() {
    localStorage.removeItem('access_token');
}

export function readToken() {
    try {
        const token = getToken();
        if (!token) return null;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

export function isAuthenticated() {
    const token = readToken();
    return token !== null;
}

export async function authenticateUser(user, password) {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({ userName: user, password }),
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();

    if (res.status === 200) {
        setToken(data.token);
        return true;
    } else {
        throw new Error(data.message);
    }
}

export async function registerUser(user, password, password2) {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({ userName: user, password, password2 }),
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();

    if (res.status === 200) {
        return true;
    } else {
        throw new Error(data.message);
    }
}
