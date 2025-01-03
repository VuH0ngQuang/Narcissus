import { host } from "./config.js";

export const renewToken = async () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        try {
            const response = await fetch(`${host}/auth/renew`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken
                }
            });

            if (response.ok) {
                console.log('Token renewed');
                const data = await response.json();
                const { accessToken, tokenType, role } = data;
                const fullToken = `${tokenType.trim()} ${accessToken.trim()}`;
                localStorage.setItem('authToken', fullToken);
                localStorage.setItem('role', role);
                console.error('Renewed token');
            } else {
                console.error('Failed to renew token');
            }
        } catch (error) {
            console.error('An error occurred while renewing token:', error);
        }
    }
};