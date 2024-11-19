<<<<<<< Updated upstream
import LoginBanner from '../../assets/Untitled.png';
import {Link} from "react-router-dom";
=======
import React, { useState } from 'react';
import LoginBanner from '../../assets/loginbanner.jpg';
import { Link } from "react-router-dom";
>>>>>>> Stashed changes

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const loginData = { email, password };

        try {
            const response = await fetch('http://127.0.0.1:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();

                // Extract and store the token
                const { accessToken, tokenType } = data;
                const fullToken = `${tokenType.trim()} ${accessToken}`;
                console.log("Login successful, token:", fullToken);

                // Save the token in localStorage for future requests
                localStorage.setItem('authToken', fullToken);

                alert("Login successful!");

                // Redirect or update the UI based on successful login
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className='divide-y-2 divide-black'>
            <div className='h-12'></div>
            <div className='w-full h-[calc(100vh-3rem)] flex flex-grow flex-row divide-black divide-x-2'>
                <div className='flex-grow flex flex-col divide-y-2 divide-black'>
                    <div>
                        <h1 className='text-6xl font-abeezee ml-10 mb-5 mt-5'>Login</h1>
                    </div>
                    <div className='flex-grow flex flex-col justify-center items-center'>
                        <form className='w-5/12 flex flex-col' onSubmit={handleLogin}>
                            <div className='w-full flex flex-row'>
                                <div className='bg-[#D9D9D9] w-full flex flex-col rounded-xl mb-5'>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className='bg-transparent w-[calc(100%-1rem)] focus:outline-none ml-2 mr-2 mt-1 mb-1 font-abeezee placeholder:text-black'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='w-full flex flex-row'>
                                <div className='bg-[#D9D9D9] w-full flex flex-col rounded-xl mb-5'>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className='bg-transparent w-[calc(100%-1rem)] focus:outline-none ml-2 mr-2 mt-1 mb-1 font-abeezee placeholder:text-black'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className='bg-[#1F4DEF] w-3/12 font-abeezee text-white rounded-xl self-end'
                            >
                                Login
                            </button>
                        </form>
                        <div className='mt-8 flex flex-row'>
                            <h1 className='font-abeezee'>New user?</h1>
                            <Link to="/register" className='font-abeezee text-red-600 ml-2'>sign up here</Link>
                        </div>
                    </div>
                </div>
                <div className='h-full aspect-[331/494]'>
                    <img src={LoginBanner} alt="loginbanner" />
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
