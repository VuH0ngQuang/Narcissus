import React from 'react';
import NavBar from '../home/NavBar';

const EditProduct = () => {
    return (
        <>
            <NavBar />
            <div className="container mx-auto px-8 pt-20">
                <h1 className="text-4xl font-bold mb-10 text-center">Edit Product</h1>
                <form className="border border-gray-300 rounded-lg p-6 space-y-6 shadow-md max-w-3xl mx-auto">
                    <div>
                        <label className="block text-lg font-medium mb-2">Product Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Enter product name"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2">Product Information</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            rows="4"
                            placeholder="Enter product details"
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-medium mb-2">Product Type</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                <option>Type 1</option>
                                <option>Type 2</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Product Price</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Enter price"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-medium mb-2">Product Stock</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Enter stock quantity"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Product Image</label>
                            <input
                                type="file"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="bg-yellow-500 text-white px-10 py-3 rounded-lg hover:bg-yellow-600">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProduct;
