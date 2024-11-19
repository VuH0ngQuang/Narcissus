import React from 'react';
import NavBar from '../home//NavBar';

const PurchasedProduct1 = () => {
    return (
        <>
            <NavBar />
            <div className="pt-16 flex flex-col items-center bg-gray-50">
                <h1 className="text-4xl font-bold mb-6 text-center">Purchased Product</h1>
                <table className="table-auto border-collapse border border-gray-300 text-left w-3/4">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 text-center">Order ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Ordered on</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">12/8/2024</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            <button className="bg-black text-white px-4 py-2 rounded-md">
                                MORE INFORMATION
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">14/8/2024</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            <button className="bg-black text-white px-4 py-2 rounded-md">
                                MORE INFORMATION
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PurchasedProduct1;
