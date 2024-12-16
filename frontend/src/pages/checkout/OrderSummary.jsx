import Banner1 from '../../assets/banner2.jpg';
import { useEffect, useRef, useState } from "react";
import { host, FEHost } from "../../config.js";

const OrderSummary = ({showQR, setShowQR, setIsPaymentInitiated, isPaymentInitiated} ) => {
    const [products, setProducts] = useState([]);
    const productsIDs = useRef(new Set());
    const [authToken] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        if (!Array.isArray(storedProducts)) {
            console.warn('Invalid products data in localStorage:', storedProducts);
            return;
        }

        const fetchProductDetails = storedProducts.map(product => {
            if (!productsIDs.current.has(product.productId)) {
                productsIDs.current.add(product.productId);
                return fetch(`${host}/products/${product.productId}`, {
                    headers: {
                        'Authorization': authToken,
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
                    .then(productDetails => ({
                        productId: product.productId,
                        image: `data:image/jpeg;base64,${productDetails.productImageBase64}`,
                        name: productDetails.productName,
                        quantity: product.quantity,
                        price: productDetails.productPrice,
                    }))
                    .catch(error => {
                        console.error(`Failed to fetch product ${product.productId}:`, error);
                        return null;
                    });
            }
            return Promise.resolve(null);
        });

        Promise.all(fetchProductDetails)
            .then(fetchedProducts => {
                setProducts(prevProducts => [
                    ...prevProducts,
                    ...fetchedProducts.filter(Boolean),
                ]);
            })
            .catch(error => console.error('Error fetching product details:', error));
    }, [authToken]);

    const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

    return (
        <div className='relative flex flex-col h-screen mx-[8%] scrollbar-hide'>
            <div className='h-12'></div>
            <div className='font-semibold'>
                <br/>
                <p>ORDER SUMMARY</p>
                <br/>
                {products.map(product => (
                    <div key={product.productId} className='w-full flex items-center border border-solid border-black'>
                        <div className="w-32 h-32 p-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex-1 pl-[24px] text-left font-semibold">
                            <p>{product.name}</p>
                            <p>Quantity: {product.quantity}</p>
                        </div>
                        <div className="text-right font-semibold">
                            <p>${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
                <hr className="border-t-[1px] border-gray-300 my-4"/>

                <div className='w-full'>
                    <div className='flex justify-between'>
                        <p className="text-left font-semibold">Subtotal</p>
                        <p className="text-right font-semibold">${total.toFixed(2)}</p>
                    </div>
                    <br/>
                    <div className='flex justify-between'>
                        <p className="text-left font-semibold">Shipping</p>
                        <p className="text-right font-semibold">$0.00</p>
                    </div>
                </div>
                <hr className="border-t-[1px] border-gray-300 my-4"/>

                <div className='w-full'>
                    <div className='flex justify-between'>
                        <p className="text-left font-semibold">Total</p>
                        <p className="text-right font-semibold">${total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            {!showQR ? <button
                type='button'
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-5 w-6/12 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                    setShowQR(true)
                    setIsPaymentInitiated(true)
                    console.log(isPaymentInitiated)
                }}
            >Pay</button> : <></>
            }
        </div>
    );
}

export default OrderSummary;