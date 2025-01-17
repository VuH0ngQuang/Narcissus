// import {Link} from "react-router-dom";

// const ProductList = ({id, name, quantity}) => {
//     return (
//         <div className='flex flex-row mt-2 mb-2'>
//             <div className=' w-1/12 mt-1 mb-1'>
//                 <h1 className='font-abeezee text-center'>{id}</h1>
//             </div>
//             <div className=' w-9/12 mt-1 mb-1'>
//                 <h1 className='font-abeezee text-center'>{name}</h1>
//             </div>
//             <div className=' w-2/12 mt-1 mb-1'>
//                 <h1 className='font-abeezee text-center'>{quantity}</h1>
//             </div>
//         </div>
//     );
// };

// const ManageTab = () => {
//     return (
//         <div className='divide-y-2 divide-black h-screen'>
//             <div className='h-12'></div>
//             <div>
//                 <h1 className='text-6xl font-abeezee ml-10 mb-5 mt-5'>Admin Dashboard</h1>
//             </div>
//             <div className=' w-full flex flex-row h-[calc(100%-9.39rem)]'>
//                 <div className='w-5/6 flex items-center justify-center'>
//                     <div className=' border-2 border-black w-[90%] h-[90%] divide-black divide-y-2 mt-10 mb-5'>
//                         <div className=' flex flex-row'>
//                             <div className=' w-1/12 mt-1 mb-1'>
//                                 <h1 className='font-abeezee text-center'>ID</h1>
//                             </div>
//                             <div className=' w-9/12 mt-1 mb-1'>
//                                 <h1 className='font-abeezee text-center'>Product Name</h1>
//                             </div>
//                             <div className=' w-2/12 mt-1 mb-1'>
//                                 <h1 className='font-abeezee text-center'>Stock Quantity</h1>
//                             </div>
//                         </div>
//                         <div className=" h-[calc(100%-2rem)] overflow-scroll flex flex-col scrollbar-hide">
//                             <ProductList id="1" name="ABC" quantity="10" className="w-full"/>
//                             <ProductList id="1" name="ABC" quantity="10" className="w-full"/>
//                             <ProductList id="1" name="ABC" quantity="10" className="w-full"/>
//                             <ProductList id="1" name="ABC" quantity="10" className="w-full"/>
//                             <ProductList id="1" name="ABC" quantity="10" className="w-full"/>
//                             <ProductList id="1" name="ABC" quantity="10" className="w-full"/>
//                             <ProductList id="1" name="ABC" quantity="10" className="w-full"/>
//                             <ProductList id="1" name="ABC" quantity="10" className="w-full"/>
//                             <ProductList id="1" name="ABC" quantity="10" className="w-full"/>
//                             <ProductList id="1" name="ABC" quantity="10" className="w-full"/>
//                             <ProductList id="1" name="ABC" quantity="10" className="w-full"/>
//                             <ProductList id="1" name="ABC" quantity="10" className="w-full"/>
//                             <ProductList id="1" name="ABC" quantity="10" className="w-full"/>
//                             <ProductList id="1" name="ABC" quantity="10" className="w-full"/>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='w-1/6 flex items-center justify-center flex-col '>
//                     <div
//                         className={'bg-[#00FF0A] border-2 border-black font-abeezee bg-opacity-50 h-10 w-40 rounded-xl flex items-center justify-center mb-10'}>
//                         <Link to='/admin/addproduct'>Add Product</Link>
//                     </div>
//                     <div className={'bg-[#FC0000] border-2 border-black font-abeezee bg-opacity-50 h-10 w-40 rounded-xl flex items-center justify-center mb-10'}>
//                         <Link to='/admin/updateproduct'>Update Product</Link>
//                     </div>
//                     <div className={'bg-[#00FCFC] border-2 border-black font-abeezee bg-opacity-50 h-10 w-40 rounded-xl flex items-center justify-center mb-10'}>
//                         <Link to='/admin/order'>Order</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ManageTab;

import { useEffect, useState } from 'react';
import { host } from "../../../config.js";
import { Link } from 'react-router-dom';

const ProductList = ({ to, id, name, quantity }) => {
    return (
        <div className='flex flex-row mt-2 mb-2'>
            <div className='w-1/12 mt-1 mb-1'>
                <h1 className='font-abeezee text-center'>{id}</h1>
            </div>
            <div className='w-7/12 mt-1 mb-1'>
                <h1 className='font-abeezee text-center'>{name}</h1>
            </div>
            <div className='w-2/12 mt-1 mb-1'>
                <h1 className='font-abeezee text-center'>{quantity}</h1>
            </div>
            <div className='w-2/12 mt-1 mb-1 flex justify-center'>
                <Link
                    to={to}
                    className="bg-[#FC0000] border-2 border-black bg-opacity-50 h-8 w-20 rounded-xl flex items-center justify-center text-sm text-black"
                >
                    Update
                </Link>
            </div>
        </div>
    );
};

const ManageTab = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${host}/products/all`)
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data.map((product) => ({
                    id: product.productID,
                    name: product.productName,
                    quantity: product.productStockQuantity,
                }));
                setProducts(filteredData); 
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div className='divide-y-2 divide-black h-screen'>
            <div className='h-12'></div>
            <div>
                <h1 className='text-6xl font-abeezee ml-10 mb-5 mt-5'>Admin Dashboard</h1>
            </div>
            <div className='w-full flex flex-row h-[calc(100%-9.39rem)]'>
                <div className='w-5/6 flex items-center justify-center'>
                    <div className='border-2 border-black w-[90%] h-[90%] divide-black divide-y-2 mt-10 mb-5'>
                        <div className='flex flex-row'>
                            <div className='w-1/12 mt-1 mb-1'>
                                <h1 className='font-abeezee text-center'>ID</h1>
                            </div>
                            <div className='w-7/12 mt-1 mb-1'>
                                <h1 className='font-abeezee text-center'>Product Name</h1>
                            </div>
                            <div className='w-2/12 mt-1 mb-1'>
                                <h1 className='font-abeezee text-center'>Stock Quantity</h1>
                            </div>
                            <div className='w-2/12 mt-1 mb-1'>
                                <h1 className='font-abeezee text-center'>Update</h1>
                            </div>
                        </div>
                        <div className="h-[calc(100%-2rem)] overflow-scroll flex flex-col scrollbar-hide">
                            {products.map((product) => (
                                <ProductList 
                                    key={product.id}
                                    to={`/admin/updateproduct/${product.id}`} 
                                    id={product.id} 
                                    name={product.name} 
                                    quantity={product.quantity} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-1/6 flex items-center justify-center flex-col'>
                    <div className='bg-[rgba(0,255,10,0.50)] border-2 border-black font-abeezee bg-opacity-50 h-10 w-40 rounded-xl flex items-center justify-center mb-10'>
                        <Link to='/admin/addproduct'>Add Product</Link>
                    </div>
                    <div className='bg-[#00FCFC] border-2 border-black font-abeezee bg-opacity-50 h-10 w-40 rounded-xl flex items-center justify-center mb-10'>
                        <Link to='/admin/order'>Order</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageTab;
