import React from 'react';
import NavBar from '../home/NavBar';
import productImage from '../../assets/product1.jpg';

const PurchasedProduct2 = () => {
    return (
        <>
            <NavBar />
            <div className="pt-16 container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Purchased Product</h1>

                <div className="grid grid-cols-1 gap-6">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex items-center border-b pb-4 mb-4">
                            <img
                                src={productImage}
                                alt="Product"
                                className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold">Snowfall</h2>
                                <p className="text-gray-500">Quantity (1)</p>
                            </div>
                            <div className="ml-auto">
                                <p className="text-xl">$100</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <div />
                    <div>
                        <p className="text-2xl font-bold">Total: $300.00</p>
                        <button className="bg-black text-white px-4 py-2 rounded-md mt-4">
                            BUY ME AGAIN
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PurchasedProduct2;
