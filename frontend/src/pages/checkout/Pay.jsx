import Banner1 from '../../assets/banner2.jpg';


const Pay = () => {
    return (
        <div className=''>
            <div className='h-12'></div>
            <div className=''>
                <form action="">
                    <div>
                        <div>
                            <h3>wanna change your address Information? <button>Click here</button></h3>
                        </div>

                        <hr class="border-t-[1px] border-black my-4"/>

                        <div>
                            <h1>MY BAE, PAY ME LIKE YOU DO {'<'}3</h1>
                        </div>
                        
                        <div className="w-full h-full">
                            <img src={Banner1} alt="Banner" className="w-full h-full object-cover"/>
                        </div>

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