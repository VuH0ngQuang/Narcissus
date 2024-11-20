import Banner1 from '../../assets/banner2.jpg';


const OrderSummary = () => {
    return (
        <div className='flex flex-col h-screen mx-[8%]'>
            <div className='h-12'></div>
            <div className='font-semibold'>
                <br />
                <p>ORDER SUMMARY</p>
                <br />
                <table className='w-full'>
                    <tbody>
                        <tr>
                            <th className="w-32 h-32 p-0 border border-solid border-black">
                                <img src={Banner1} alt="Banner" className="w-full h-full object-cover"/>
                            </th>

                            <th className=" pl-[24px] text-left font-semibold">
                                <p>SnowFall</p>
                                <p>Quantity {'{'}<span>1</span>{'}'}</p>
                            </th>

                            <th className=" text-right font-semibold">
                                <p>$<span>100</span></p>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <hr class="border-t-[1px] border-gray-300 my-4"/>

                <table className='w-full'>
                    <tbody>
                        <tr>
                            <th className="text-left font-semibold">
                                <p>Subtotal</p>
                            </th>

                            <th>

                            </th>

                            <th className="text-right font-semibold">
                                <p>$<span>100</span></p>
                            </th>
                        </tr>
                        <br />
                        <tr>
                            <th className="text-left font-semibold">
                                <p>Shipping</p>
                            </th>

                            <th>
                                
                            </th>

                            <th className="text-right font-semibold">
                                <p>$<span>0</span></p>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <hr class="border-t-[1px] border-gray-300 my-4"/>

                <table className='w-full'>
                    <tbody>
                        <tr>
                            <th className="text-left font-semibold">
                                <p>Total</p>
                            </th>

                            <th>

                            </th>

                            <th className="text-right font-semibold">
                                <p>$<span>100</span></p>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default OrderSummary;