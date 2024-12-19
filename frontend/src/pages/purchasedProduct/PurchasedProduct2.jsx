import React, { useEffect, useState } from 'react';
import { FEHost, host } from "../../config.js";
import { useParams } from "react-router-dom";

const ProductItem = ({ product, quantity, price }) => {
    return (
        <div className="flex items-center border-b pb-4 mb-4">
            <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="ml-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-500">Quantity: {quantity}</p>
            </div>
            <div className="ml-auto">
                <p className="text-xl">${price.toFixed(2)}</p>
            </div>
        </div>
    );
};

const PurchasedProduct2 = () => {
    const { orderId } = useParams();
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        fetch(`${host}/orders/${orderId}`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status === 401) {
                    window.location.href = `${FEHost}/login`;
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(orderData => {
                setOrderDetails(orderData);
                const productFetches = orderData.consistOfDtos.map(item =>
                    fetch(`${host}/products/${item.productId}`, {
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(productData => ({
                            name: productData.productName,
                            image: `data:image/jpeg;base64,${productData.productImageBase64}`,
                            quantity: item.quantity,
                            price: productData.productPrice,
                        }))
                );

                Promise.all(productFetches)
                    .then(fetchedProducts => {
                        setProducts(fetchedProducts);
                        const totalAmount = fetchedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
                        setTotal(totalAmount);
                    })
                    .catch(error => console.error('Error fetching product details:', error));
            })
            .catch(error => console.error('Error fetching order details:', error));
    }, [token, orderId]);

    return (
        <div className="pt-16 container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Order Details</h1>

            {orderDetails && (
                <div className="bg-[#eeeeee] border rounded-lg p-6 mb-8">
                    <p className="text-xl"><strong>Order ID:</strong> {orderDetails.orderId}</p>
                    <p className="text-xl"><strong>Total Money:</strong> ${orderDetails.money.toFixed(2)}</p>
                    <p className={`text-xl ${orderDetails.status === 'CANCELLED' ? 'text-red-500' : 'text-green-500'}`}>
                        <strong>Status:</strong> {orderDetails.status}
                    </p>
                    <p className="text-xl"><strong>Date:</strong> {new Date(orderDetails.date).toLocaleString()}</p>
                    {orderDetails.status === 'CANCELLED' && (
                        <>
                            <p className="text-xl text-red-500"><strong>Cancellation Reason:</strong> {orderDetails.cancellationReason}</p>
                            <p className="text-xl"><strong>Canceled At:</strong> {new Date(orderDetails.canceledAt).toLocaleString()}</p>
                        </>
                    )}
                </div>
            )}

            <h2 className="text-2xl font-bold mb-4">Purchased Products</h2>
            <div className="grid grid-cols-1 gap-6">
                {products.map((product, index) => (
                    <ProductItem
                        key={index}
                        product={product}
                        quantity={product.quantity}
                        price={product.price}
                    />
                ))}
            </div>

            <div className="flex justify-between items-center mt-8">
                <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
                <button className="bg-black text-white px-4 py-2 rounded-md">
                    BUY ME AGAIN
                </button>
            </div>
        </div>
    );
};

export default PurchasedProduct2;
