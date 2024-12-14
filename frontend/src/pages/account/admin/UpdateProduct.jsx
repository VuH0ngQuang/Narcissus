import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({
        productName: false,
        productType: false,
        productPrice: false,
        productStockQuantity: false,
        productImage: false,
    });

    // Create refs for each input
    const productNameRef = useRef(null);
    const productTypeRef = useRef(null);
    const productPriceRef = useRef(null);
    const productStockQuantityRef = useRef(null);
    const productImageRef = useRef(null);

    // Fetch product details when component mounts
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${host}/products/${productID}`, {
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch product data.");
                }
                const data = await response.json();
                setProductData({
                    productName: data.productName,
                    productInfo: data.productInfo,
                    productDate: data.productDate,
                    productType: data.productType,
                    productPrice: data.productPrice,
                    productStockQuantity: data.productStockQuantity,
                });
                setProductImage(data.productImageBase64); // Lưu URL hình ảnh để hiển thị
            } catch (error) {
                console.error("Error fetching product details:", error);
                setNotification("Failed to load product data.");
            }
        };

        fetchProductDetails();
    }, [productID, authToken]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]:
                name === "productPrice" || name === "productStockQuantity"
                    ? Math.max(0, parseFloat(value) || 0)
                    : value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith("image/")) {
            alert("Only image files are allowed!");
            setProductImage(null);
            setFormErrors({ ...formErrors, productImage: true });
            return;
        }
        setProductImage(file);
        setFormErrors({ ...formErrors, productImage: false });
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        let hasError = false;
        const errors = {
            productName: !productData.productName,
            productType: !productData.productType,
            productPrice: productData.productPrice < 0,
            productStockQuantity: productData.productStockQuantity < 0,
            productImage: !productImage,
        };

        setFormErrors(errors);

        if (Object.values(errors).includes(true)) {
            setNotification("Please fill in all required fields.");
            hasError = true;
        }

        // If there are errors, move focus to the first field with an error
        if (hasError) {
            if (errors.productName) {
                productNameRef.current.focus();
            } else if (errors.productType) {
                productTypeRef.current.focus();
            } else if (errors.productPrice) {
                productPriceRef.current.focus();
            } else if (errors.productStockQuantity) {
                productStockQuantityRef.current.focus();
            } else if (errors.productImage) {
                productImageRef.current.focus();
            }
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append(
                "product",
                new Blob([JSON.stringify(productData)], { type: "application/json" })
            );

            if (productImage) {
                formData.append("image", productImage);
            }

            const response = await fetch(`${host}/products/update/${productID}`, {
                method: "POST",
                headers: {
                    Authorization: authToken,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload product data and image");
            }

            setNotification("Product updated successfully!");

            setTimeout(() => {
                window.location.href = `${FEHost}/admin/dashboard`;
            }, 3000);
        } catch (error) {
            console.error("Error uploading product and image:", error);
            setNotification("Failed to update product. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-screen items-center">
            {/* Khoảng cách cho thanh công cụ */}
            <div className="h-12"></div>

            <div className="h-4"></div>

            {/* Phần tiêu đề */}
            <div className="w-full max-w-2xl mx-auto">
                <div className="flex flex-row w-full mb-5">
                    <h1 className="text-4xl font-bold ml-5 mb-3">Update Product {productID}</h1>
                    <div className="flex flex-grow items-center justify-end">
                        <div className="bg-[#00FF0A] border-2 border-black font-abeezee bg-opacity-50 h-10 w-40 rounded-xl flex mr-10">
                            <Link to="/admin/dashboard" className="h-full w-full justify-center flex items-center font-abeezee">
                                Return
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form nhập liệu */}
            <div className="w-full max-w-2xl mx-auto">
                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        value={productData.productName}
                        onChange={handleInputChange}
                        ref={productNameRef}
                        className={`border w-full p-2 ${formErrors.productName ? "border-red-500" : ""}`}
                        required
                    />
                    {formErrors.productName && (
                        <p className="text-red-500 text-sm">Product Name is required.</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Information</label>
                    <textarea
                        name="productInfo"
                        value={productData.productInfo}
                        onChange={handleInputChange}
                        className="border w-full p-2 resize-none"
                        rows={4}
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Type</label>
                    <select
                        name="productType"
                        value={productData.productType}
                        onChange={handleInputChange}
                        ref={productTypeRef}
                        className={`border w-full p-2 ${formErrors.productType ? "border-red-500" : ""}`}
                        required
                    >
                        <option value="">Select Product Type</option>
                        <option value="Type 1">Type 1</option>
                        <option value="Type 2">Type 2</option>
                        <option value="Type 3">Type 3</option>
                    </select>
                    {formErrors.productType && (
                        <p className="text-red-500 text-sm">Product Type is required.</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Price</label>
                    <input
                        type="number"
                        name="productPrice"
                        value={productData.productPrice}
                        onChange={handleInputChange}
                        ref={productPriceRef}
                        className={`border w-full p-2 ${formErrors.productPrice ? "border-red-500" : ""}`}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Stock</label>
                    <input
                        type="number"
                        name="productStockQuantity"
                        value={productData.productStockQuantity}
                        onChange={handleInputChange}
                        ref={productStockQuantityRef}
                        className={`border w-full p-2 ${formErrors.productStockQuantity ? "border-red-500" : ""}`}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-bold mb-1">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={productImageRef}
                        className={`border w-full p-2 ${formErrors.productImage ? "border-red-500" : ""}`}
                        required
                    />
                    {formErrors.productImage && (
                        <p className="text-red-500 text-sm">Product Image is required.</p>
                    )}
                </div>

                {/* Hiển thị hình ảnh nếu có */}
                {productImage && (
                    <div className="mb-4">
                        <label className="block font-bold mb-1">Image</label>
                        <img src={productImage instanceof File ? URL.createObjectURL(productImage) : `data:image/png;base64,${productImage}`} alt="Product" className="w-full h-64 object-contain" />
                    </div>
                )}

                {notification && (
                    <div className="mb-4 text-center text-red-500">
                        {notification}
                    </div>
                )}

                <div className="mb-4 text-center">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-[#3a3a3a] text-white py-2 px-6 rounded-md"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Update Product"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
