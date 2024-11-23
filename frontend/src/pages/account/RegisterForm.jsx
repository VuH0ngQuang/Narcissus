import LoginBanner from "../../assets/loginbanner.jpg";
import {useState} from "react";
import {FEHost, host} from "../../config.js";

const RegisterForm = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const registerData = {username: userName, email, password, address, phoneNumber}

        try {
            const response = await fetch(`${host}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            if (response.ok) {
                alert('Register successfully');
                window.location.href =`${FEHost}/login`
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            alert(`An error has occurred: ${error.message}`);
        }
    }

    return (
        <div className='divide-y-2 divide-black'>
            <div className='h-12'></div>
            <div className='w-full h-[calc(100vh-3rem)] flex flex-grow flex-row divide-black divide-x-2'>
                <div className='flex-grow flex flex-col divide-y-2 divide-black'>
                    <div>
                        <h1 className='text-6xl font-abeezee ml-10 mb-5 mt-5'>Create new account</h1>
                    </div>
                    <div className=' flex-grow flex flex-col justify-center items-center'>
                        <form className=' w-5/12 flex flex-col' onSubmit={handleRegister}>
                            <div className='w-full flex flex-row'>
                                <div className='bg-[#D9D9D9] w-full flex flex-col rounded-xl mb-5'>
                                    <input type="text"
                                           placeholder={"UserName"}
                                           className='bg-transparent w-[calc(100%-1rem)] focus:outline-none ml-2 mr-2 mt-1 mb-1 font-abeezee placeholder:text-black'
                                           onChange={(e) => setUserName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='w-full flex flex-row'>
                                <div className='bg-[#D9D9D9] w-full flex flex-col rounded-xl mb-5'>
                                    <input type="email"
                                           placeholder={"Email"}
                                           className='bg-transparent w-[calc(100%-1rem)] focus:outline-none ml-2 mr-2 mt-1 mb-1 font-abeezee placeholder:text-black'
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='w-full flex flex-row'>
                                <div className='bg-[#D9D9D9] w-full flex flex-col rounded-xl mb-5'>
                                    <input type="password"
                                           placeholder={"Password"}
                                           className='bg-transparent w-[calc(100%-1rem)] focus:outline-none ml-2 mr-2 mt-1 mb-1 font-abeezee placeholder:text-black'
                                           onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='w-full flex flex-row'>
                                <div className='bg-[#D9D9D9] w-full flex flex-col rounded-xl mb-5'>
                                    <input type="text"
                                           placeholder={"Address"}
                                           className='bg-transparent w-[calc(100%-1rem)] focus:outline-none ml-2 mr-2 mt-1 mb-1 font-abeezee placeholder:text-black'
                                           onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='w-full flex flex-row'>
                                <div className='bg-[#D9D9D9] w-full flex flex-col rounded-xl mb-5'>
                                    <input type="phone"
                                           placeholder={"Phone Number"}
                                           className='bg-transparent w-[calc(100%-1rem)] focus:outline-none ml-2 mr-2 mt-1 mb-1 font-abeezee placeholder:text-black'
                                           onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button type={"submit"}
                                    className='bg-[#1F4DEF] w-3/12 font-abeezee text-white rounded-xl self-center mb-20 mt-2    '
                            >Register</button>
                        </form>
                    </div>
                </div>
                <div className='h-full aspect-[331/494]'>
                    <img src={LoginBanner} alt={"loginbanner"}/>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;