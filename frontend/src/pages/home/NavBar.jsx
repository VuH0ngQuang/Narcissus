import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className='pt-[4px] pb-[4px] h-[48px] w-full bg-[#D4F6FF] flex flex-row fixed top-0 z-50 border-b-[1px] border-black'>
            <div className='h-full w-1/4'>
                <Link to={'/'} className='flex flex-row h-full w- ml-3'>
                    <img src={logo} alt='logo' className='h-full ml-1' />
                    <h1 className='ml-2 flex items-center font-abeezee text-3xl'>Narcissus</h1>
                </Link>
            </div>
            <div className='w-2/4 flex justify-center items-center'>
                <div className='bg-[rgba(58,54,253,0.4)] flex flex-row w-full rounded-md shadow-sm'>
                    <input
                        type='text'
                        className='bg-transparent w-5/6 ml-3 focus:outline-none text-white text-sm '
                    />
                    <button className='bg-transparent w-1/6 rounded-r-md text-white font-abeezee'>Search</button>
                </div>
            </div>
            <div className='w-1/4 flex flex-row justify-center items-center'>
                <div>
                    <Link className='mr-4 ml-4 text-[#FF0099] font-abeezee font-bold' to={'/login'}>Account</Link>
                </div>
                <div>
                    <Link className='ml-4 mr-4 text-[#FF0099] font-abeezee font-bold' to={'/orders'}>Orders</Link>
                </div>
                <div>
                    <Link className='ml-4 mr-4 text-[#FF0099] font-abeezee font-bold' to={'/cart'}>Cart</Link>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
