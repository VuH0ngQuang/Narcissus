import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { host } from "../../../config.js";

const List = ({ orderId, orderDate, orderStatus, money, to }) => {
    return (
        <div className='flex flex-row h-10'>
            <div className='w-2/12 flex justify-center items-center'>
                <h1>{orderId}</h1>
            </div>
            <div className='w-3/12 flex justify-center items-center'>
                <h1>{orderDate}</h1>
            </div>
            <div className='w-3/12 flex justify-center items-center'>
                <h1>{orderStatus}</h1>
            </div>
            <div className='w-2/12 flex justify-center items-center'>
                <h1>${money}</h1>
            </div>
            <div className='w-2/12 flex justify-center items-center'>
                <Link
                    to={to}
                    className="bg-[#FC0000] border-2 border-black bg-opacity-50 h-8 w-20 rounded-xl flex items-center justify-center text-sm text-black"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [authToken] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        fetch(`${host}/orders/getAll`, {
            method: 'GET',
            headers: {
                'Authorization': authToken
            }
        })
        .then((response) => response.json())
        .then((data) => {
            const transformedOrders = data.map((order) => {
                const date = new Date(order.date);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();

                const formattedDate = `${day}/${month}/${year}`;

                return {
                    orderId: order.orderId,
                    orderDate: formattedDate,
                    orderStatus: order.status,
                    money: order.money, // Thêm trường tiền
                };
            });
            setOrders(transformedOrders);
        })
        .catch((error) => console.error("Error fetching orders:", error));
    }, []);

    return (
        <div className='h-screen divide-y-2 divide-black'>
            <div className='h-12'></div>
            <div>
                <div className='flex flex-row'>
                    <h1 className='text-6xl font-abeezee ml-10 mb-5 mt-5'>Order</h1>
                    <div className='flex flex-grow items-center justify-end'>
                        <div className='bg-[#00FF0A] border-2 border-black font-abeezee bg-opacity-50 h-10 w-40 rounded-xl flex mr-36'>
                            <Link to='/admin/dashboard' className='h-full w-full justify-center flex items-center font-abeezee'>
                                Return
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-14'></div>
            <div className='flex flex-row h-10'>
                <div className='w-2/12 flex justify-center items-center'>
                    <h1>Order ID</h1>
                </div>
                <div className='w-3/12 flex justify-center items-center'>
                    <h1>Order On</h1>
                </div>
                <div className='w-3/12 flex justify-center items-center'>
                    <h1>Payment Status</h1>
                </div>
                <div className='w-2/12 flex justify-center items-center'>
                    <h1>Price</h1>
                </div>
                <div className='w-2/12 flex justify-center items-center'>
                    <h1>Details</h1>
                </div>
            </div>
            <div className="overflow-scroll scrollbar-hide h-[calc(100%-3.5rem-2.5rem-3rem-6.38rem)]">
                {orders.map((order) => (
                    <List
                        key={order.orderId}
                        orderId={order.orderId}
                        orderDate={order.orderDate}
                        orderStatus={order.orderStatus}
                        money={order.money} // Truyền thêm tiền vào
                        to={`/admin/vieworder/${order.orderId}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default OrderList;
