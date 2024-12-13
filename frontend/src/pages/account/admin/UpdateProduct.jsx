import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const UpdateProduct = () => {
    const location = useLocation();
    const id = location.search.replace("?", "");

    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const mockProducts = [
                {
                    id: "1",
                    name: "Sunflower",
                    info: "A beautiful sunflower.",
                    type: "Type 1",
                    price: 100,
                    stock: 89,
                    image: "path/to/sunflower.png",
                },
                {
                    id: "2",
                    name: "Rose",
                    info: "A romantic red rose.",
                    type: "Type 2",
                    price: 50,
                    stock: 120,
                    image: "path/to/rose.png",
                },
            ];
            const product = mockProducts.find((p) => p.id === id);
            setProductData(product);
        };

        fetchData();
    }, [id]);

    if (!productData) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="h-screen flex flex-col items-center p-10">
            <h1 className="text-4xl font-bold mb-8">Update Product {productData.id}</h1>
            <div className="w-full max-w-2xl">
                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Name</label>
                    <input
                        type="text"
                        value={productData.name}
                        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                        className="border w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Information</label>
                    <textarea
                        value={productData.info}
                        onChange={(e) => setProductData({ ...productData, info: e.target.value })}
                        className="border w-full p-2"
                        rows={4}
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Type</label>
                    <select
                        value={productData.type}
                        onChange={(e) => setProductData({ ...productData, type: e.target.value })}
                        className="border w-full p-2"
                    >
                        <option value="Type 1">Type 1</option>
                        <option value="Type 2">Type 2</option>
                        <option value="Type 3">Type 3</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Price</label>
                    <input
                        type="number"
                        value={productData.price}
                        onChange={(e) => setProductData({ ...productData, price: +e.target.value })}
                        className="border w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Stock</label>
                    <input
                        type="number"
                        value={productData.stock}
                        onChange={(e) => setProductData({ ...productData, stock: +e.target.value })}
                        className="border w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Image</label>
                    <input
                        type="file"
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                image: e.target.files[0]?.name || productData.image,
                            })
                        }
                        className="border w-full p-2"
                    />
                </div>
                <button
                    onClick={() => console.log("Updated Product Data:", productData)}
                    className="bg-[#D2A41D] text-black font-bold py-2 px-6 rounded-lg w-full hover:bg-[#b08b19] transition duration-200"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default UpdateProduct;
