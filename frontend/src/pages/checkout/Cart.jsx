import Banner1 from '../../assets/banner2.jpg';

const Cart = () => {
     return (
         <div className='mx-[8%]'>
               <div className='h-12'></div>
               <div className='flex flex-col h-screen'>
                    <form action="">
                         <table className="w-full">
                              <tbody>
                                   <br />
                                   <br />

                                   <tr className="">
                                        <th className="w-auto"></th>
                                        <th className="w-[7%] h-[128px]">
                                             <input type="checkbox" name="" id="" className="w-[20px] h-[20px]"/>
                                        </th>

                                        <th className="w-32 h-32 p-0 border border-solid border-black">
                                             <img src={Banner1} alt="Banner" className="w-full h-full object-cover"/>
                                        </th>

                                        <th className="w-[20%] pl-[24px] border-b text-left font-semibold">
                                             <p>SnowFall</p>
                                             <p>Quantity {'{'}<span>1</span>{'}'}</p>
                                        </th>

                                        <th className="w-[20%] border-b text-right font-semibold">
                                             <p>$<span>100</span></p>
                                        </th>

                                        <th className="w-[15%] font-semibold">
                                             <div className=' flex flex-row items-center justify-center '>
                                                  <button className='w-[32px] h-[32px] border '>-</button>
                                                  <input type="text-number" min="1" value="1" className="w-[48px] h-[32px] text-center border-t border-b" />
                                                  <button className='w-[32px] h-[32px] border'>+</button>
                                             </div>
                                        </th>

                                        <th className="w-[160px]">
                                             <button className="w-full bg-red-500 text-black border border-black rounded-full px-4 py-2 hover:bg-red-600">Remove</button>
                                        </th>
                                        <th className="w-auto"></th>
                                   </tr>

                                   <br />
                                   <br />

                                   <tr className="">
                                        <th className="w-auto"></th>
                                        <th className="w-[7%] h-[128px]">
                                             <input type="checkbox" name="" id="" className="w-[20px] h-[20px]"/>
                                        </th>

                                        <th className="w-32 h-32 p-0 border border-solid border-black">
                                             <img src={Banner1} alt="Banner" className="w-full h-full object-cover"/>
                                        </th>

                                        <th className="w-[20%] pl-[24px] border-b text-left font-semibold">
                                             <p>SnowFall</p>
                                             <p>Quantity {'{'}<span>1</span>{'}'}</p>
                                        </th>

                                        <th className="w-[20%] border-b text-right font-semibold">
                                             <p>$<span>100</span></p>
                                        </th>

                                        <th className="w-[15%] font-semibold">
                                             <div className=' flex flex-row items-center justify-center '>
                                                  <button className='w-[32px] h-[32px] border'>-</button>
                                                  <input type="text-number" min="1" value="1" className="w-[48px] h-[32px] text-center border-t border-b" />
                                                  <button className='w-[32px] h-[32px] border'>+</button>
                                             </div>
                                        </th>

                                        <th className="w-[160px]">
                                             <button className="w-full bg-red-500 text-black border border-black rounded-full px-4 py-2 hover:bg-red-600">Remove</button>
                                        </th>
                                        <th className="w-auto"></th>
                                   </tr>
                              </tbody>
                              <br />
                              <tfoot>
                                   <tr className="">
                                        <th className="w-auto"></th>
                                        <th className="">
                                        </th>

                                        <th className="">
                                        </th>

                                        <th className="w-[20%] pl-[96px] text-left font-semibold">
                                             <p>Total</p>
                                        </th>
                                        <th className="w-[20%] pr-[24px] text-right font-semibold">
                                             <p>$<span>100</span></p>
                                        </th>
                                        <th className="w-auto"></th>
                                   </tr>
                                   <br />
                                   <br />
                                   <br />
                                   <tr className="">
                                        <th className="w-auto"></th>
                                        <th className="">
                                        </th>

                                        <th className="">
                                        </th>

                                        <th className="pl-[120px] h-[64px] font-semibold" colSpan="2">
                                             <button className="border w-full h-full py-2 px-4 bg-black text-white">MAKE A PURCHASE</button>
                                        </th>
                                        <th className="w-auto"></th>
                                   </tr>
                              
                              </tfoot>
                         </table>
                    </form>
               </div>
         </div>
     );
}
 
export default Cart;