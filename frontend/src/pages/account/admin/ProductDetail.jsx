import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { host } from "../../../config.js";

const List = ({ productID, productName, quantity, price }) => {
    return (
        <div className="flex flex-row h-10 border-b">
            <div className="w-3/12 flex justify-center items-center">
                <h1>{productID}</h1>
            </div>
            <div className="w-4/12 flex justify-center items-center">
                <h1>{productName}</h1>
            </div>
            <div className="w-2/12 flex justify-center items-center">
                <h1>{quantity}</h1>
            </div>
            <div className="w-3/12 flex justify-center items-center">
                <h1>${price}</h1>
            </div>
        </div>
    );
};

const ProductDetail = () => {
    const { orderID } = useParams();
    const [authToken] = useState(localStorage.getItem('authToken'));
    const [products, setProducts] = useState([]);
    const [orderInfo, setOrderInfo] = useState(null);

    useEffect(() => {
        console.log(orderID);
        fetch(`${host}/orders/${orderID}`, {
            method: 'GET',
            headers: {
                'Authorization': authToken
            }
        })
        .then((response) => response.json())
        .then((orderData) => {
            setOrderInfo(orderData); // Store order details
            const productPromises = orderData.consistOfDtos.map((item) =>
                fetch(`${host}/products/${item.productId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': authToken
                    }
                })
                .then((res) => res.json())
                .then((productData) => ({
                    productID: item.productId,
                    productName: productData.productName,
                    quantity: item.quantity,
                    price: productData.productPrice * item.quantity,
                }))
            );

            Promise.all(productPromises).then((productList) => {
                setProducts(productList);
            });
        });
    }, [orderID, authToken]);

    return (
        <div className='h-screen divide-y-2 divide-black'>
            <div className='h-12'></div>
            <div>
                <div className='flex flex-row'>
                    <h1 className='text-6xl font-abeezee ml-10 mb-5 mt-5'>
                        Order {orderID}
                    </h1>
                    <div className='flex flex-grow items-center justify-end'>
                        <div className='bg-[#00FF0A] border-2 border-black font-abeezee bg-opacity-50 h-10 w-40 rounded-xl flex mr-36'>
                            <Link to='/admin/order' className='h-full w-full justify-center flex items-center font-abeezee'>
                                Return
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-14'></div>

            <div className='flex flex-row h-10 bg-gray-200 font-semibold'>
                <div className='w-3/12 flex justify-center items-center'>
                    <h1>Product ID</h1>
                </div>
                <div className='w-4/12 flex justify-center items-center'>
                    <h1>Product Name</h1>
                </div>
                <div className='w-2/12 flex justify-center items-center'>
                    <h1>Quantity</h1>
                </div>
                <div className='w-3/12 flex justify-center items-center'>
                    <h1>Price</h1>
                </div>
            </div>

            <div className="overflow-scroll scrollbar-hide">
                {products.map((product) => (
                    <List
                        key={product.productID}
                        productID={product.productID}
                        productName={product.productName}
                        quantity={product.quantity}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductDetail;
