import { useState, useEffect } from 'react';
import { FEHost } from '../../config.js';

const UseAuth = (requiredRole = null) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        const token = localStorage.getItem('role');

        if (!token) {
            window.location.href = `${FEHost}/login`;
        } else if (requiredRole && token !== requiredRole) {
            window.location.href = `${FEHost}/login`;
        }
    }, [authToken, requiredRole]);

    return authToken;
};

export default UseAuth;
