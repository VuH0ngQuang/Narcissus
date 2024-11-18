import Banner1 from '../../assets/banner2.jpg';


const Pay = () => {
    return (
        <div className='mx-[8%]'>
            <div className='h-12'></div>
            <div className='font-semibold'>
                <form action="">
                    <div>
                        <br />
                        <div className='bg-gray-300 w-full h-[70px] flex justify-center items-center'>
                            <h3>Wanna change your address Information? <button><b>Click here</b></button></h3>
                        </div>

                        <hr class="border-t-[1px] border-black my-4"/>

                        <div className='bg-pink-300 w-full h-[100px] flex justify-center items-center'>
                            <p>MY BAE, PAY ME LIKE YOU DO {'<'}3</p>
                        </div>

                        <br />
                        
                        <div className="w-full h-full">
                            <img src={Banner1} alt="Banner" className="w-full h-full object-cover"/>
                        </div>

                        <br />
                        
                        <div>
                            <button className="w-full bg-red-500 text-white border border-black px-4 py-2 hover:bg-red-600">I DON'T WANT TO PAY</button>
                            
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Pay;