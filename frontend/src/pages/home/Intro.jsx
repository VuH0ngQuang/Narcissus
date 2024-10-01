import { FaInstagram } from "react-icons/fa6";

const Intro = () => {
    return (
        <div className='flex flex-row h-96 w-full'>
            <div className='flex flex-col w-1/2 h-full items-center justify-center'>
                <div>
                    <h1 className='font-abeezee text-6xl mb-2'>Narcissus</h1>
                    <h1 className='font-abeezee text-6xl mb-2'>The Flower Shop</h1>
                    <div className='flex flex-row'>
                        <FaInstagram  size={70}/>
                        <h1 className='ml-3 font-abeezee text-6xl '>@nar.cissus</h1>
                    </div>
                </div>
            </div>
            <div className='flex w-1/2 h-full items-center justify-center'>
                <h1 className='font-parisienne italic text-6xl text-center'>"We have flowers more beautiful than you ex"</h1>
            </div>
        </div>
    );
}

export default Intro;