import React, { useEffect, useState } from 'react';
import NavBar from '../home/NavBar';
import { FEHost, host } from "../../config.js";

const PurchasedProduct1 = () => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`${host}/orders/get`, {
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
            .then(data => {
                // Sort orders by date, newest first
                data.sort((a, b) => new Date(b.date) - new Date(a.date));
                const formattedOrders = data.map(order => ({
                    id: order.orderId,
                    date: new Date(order.date).toLocaleDateString(),
                    status: order.status
                }));
                setOrders(formattedOrders);
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, [token]);

    const handleMoreInfoClick = (orderId) => {
        console.log(`Redirecting to: ${FEHost}/orders/${orderId}`);
        window.location.href = `${FEHost}/orders/${orderId}`;
    };

    return (
        <>
            <div className="pt-16 flex flex-col items-center bg-gray-50">
                <h1 className="text-4xl font-bold mb-6 text-center">Purchased Product</h1>
                <div className="w-3/4">
                    {orders.map(order => (
                        <div key={order.id} className="bg-blue-200 shadow-md rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center">
                                <div className="flex-grow mr-16">
                                    <p className="text-lg font-semibold">Order ID: {order.id}</p>
                                    <div className="flex-grow">
                                        <p className="text-gray-600">Ordered on: {order.date}</p>
                                        <p className="text-gray-600">Payment status: {order.status}</p>
                                    </div>
                                </div>
                                <button
                                    className="bg-black text-white px-4 py-2 rounded-md"
                                    onClick={() => handleMoreInfoClick(order.id)}
                                >
                                    MORE INFORMATION
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PurchasedProduct1;