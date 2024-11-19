import React from 'react';
import NavBar from '../home/NavBar';

const SellerDashboard = () => {
    const products = [
        { id: 1, name: "Sunflower", stock: 69 },
        { id: 2, name: "Jack", stock: 96 },
        { id: 3, name: "J97", stock: 169 },
    ];

    return (
        <>
            <NavBar />
            <div className="container mx-auto px-4 pt-16">
                <h1 className="text-4xl font-bold mb-8 text-center">Seller Dashboard</h1>
                <table className="w-full border-collapse border border-gray-300 text-center">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Product ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Stock</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="mt-4 text-right">
                    <button className="bg-green-500 text-white px-6 py-2 rounded-lg">
                        Add More Product
                    </button>
                </div>
            </div>
        </>
    );
};

export default SellerDashboard;
