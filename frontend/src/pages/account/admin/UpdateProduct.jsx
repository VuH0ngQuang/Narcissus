import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { host, FEHost } from "../../../config.js";

const UpdateProduct = () => {
    const { productID } = useParams();

    const [authToken] = useState(localStorage.getItem("authToken"));

    const [productData, setProductData] = useState({
        productName: "",
        productInfo: "",
        productDate: null,
        productType: "",
        productPrice: 0,
        productStockQuantity: 0,
    });

    const [productImage, setProductImage] = useState(null);
    const [notification, setNotification] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái để vô hiệu hóa nút

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]:
                name === "productPrice" || name === "productStockQuantity"
                    ? parseFloat(value) || 0
                    : value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith("image/")) {
            alert("Only image files are allowed!");
            setProductImage(null);
            return;
        }
        setProductImage(file);
    };

    const handleSubmit = async () => {
        if (isSubmitting) return; // Ngăn gửi nhiều lần
        setIsSubmitting(true); // Đặt trạng thái đang xử lý

        try {
            const formData = new FormData();
            formData.append(
                "product",
                new Blob([JSON.stringify(productData)], { type: "application/json" })
            );

            if (productImage) {
                formData.append("image", productImage);
            }

            const response = await fetch(`${host}/products/add`, {
                method: "POST",
                headers: {
                    Authorization: authToken,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload product data and image");
            }

            setNotification("Product added successfully!");

            setTimeout(() => {
                window.location.href = `${FEHost}/admin/dashboard`;
            }, 3000);
        } catch (error) {
            console.error("Error uploading product and image:", error);
            setNotification("Failed to add product. Please try again.");
            setIsSubmitting(false); // Đặt lại trạng thái để thử lại nếu gặp lỗi
        }
    };

    return (
        <div className="h-screen flex flex-col items-center p-10">
            <div className="flex flex-row w-full mb-5">
                <h1 className="text-4xl font-bold ml-10">Update Product</h1>
                <div className="flex flex-grow items-center justify-end">
                    <div className="bg-[#00FF0A] border-2 border-black font-abeezee bg-opacity-50 h-10 w-40 rounded-xl flex mr-10">
                        <Link to="/admin/dashboard" className="h-full w-full justify-center flex items-center font-abeezee">
                            Return
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-2xl">
                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        value={productData.productName}
                        onChange={handleInputChange}
                        className="border w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Information</label>
                    <textarea
                        name="productInfo"
                        value={productData.productInfo}
                        onChange={handleInputChange}
                        className="border w-full p-2"
                        rows={4}
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Type</label>
                    <select
                        name="productType"
                        value={productData.productType}
                        onChange={handleInputChange}
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
                        name="productPrice"
                        value={productData.productPrice}
                        onChange={handleInputChange}
                        className="border w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Stock</label>
                    <input
                        type="number"
                        name="productStockQuantity"
                        value={productData.productStockQuantity}
                        onChange={handleInputChange}
                        className="border w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border w-full p-2"
                    />
                </div>
                {notification && (
                    <div className="mb-4 text-center text-lg font-bold text-green-600">
                        {notification}
                    </div>
                )}
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`${
                        isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#D2A41D] hover:bg-[#b08b19]"
                    } text-black font-bold py-2 px-6 rounded-lg w-full transition duration-200`}
                >
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
};

export default UpdateProduct;
