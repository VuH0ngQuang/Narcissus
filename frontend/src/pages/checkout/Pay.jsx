import Banner1 from '../../assets/banner2.jpg';
import { usePayOS } from "@payos/payos-checkout";
import {useEffect, useState} from "react";
import {FEHost, host} from "../../config.js";

const Pay = ({ setShowPay, showQR, setOrderId, isCanceled }) => {
    const [checkoutUrl, setCheckoutUrl] = useState('')
    const [authToken] = useState(localStorage.getItem('authToken'));
    const [hasFetchedPayment, setHasFetchedPayment] = useState(false);


    const [payOSConfig, setPayOSConfig] = useState({
        RETURN_URL: window.location.origin, // required
        ELEMENT_ID: "embedded-payment-container", // required
        CHECKOUT_URL: null, // required
        embedded: true, // Nếu dùng giao diện nhúng
        onSuccess: (event) => {
            localStorage.removeItem('products')
            window.location.href = `${FEHost}/successful`
        },
        onCancel: (event) => {
            localStorage.removeItem('products')
            window.location.href = `${FEHost}/failed`
        },
        onExit: (event) => {
            localStorage.removeItem('products')
            window.location.href = `${FEHost}/failed`
        }
    });

    const { open, exit } = usePayOS(payOSConfig);

    const getPayment = async () => {
        try {
            // Retrieve and parse products from localStorage
            const products = JSON.parse(localStorage.getItem('products'));

            const response = await fetch(`${host}/orders/create`, {
                headers: {
                    'Authorization': authToken,
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(products)
            });

            if (response.status === 401) {
                console.log("Request Body:", products);
                window.location.href = `${FEHost}/login`;
                return;
            }

            if (!response.ok) {
                console.log("Server doesn't respond");
                return;
            }

            const data = await response.json();
            setOrderId(data.ordersId);
            setCheckoutUrl(data.checkoutUrl);
            console.log("Checkout URL from API:", data.checkoutUrl);

            setPayOSConfig((oldConfig) => ({
                ...oldConfig,
                CHECKOUT_URL: data.checkoutUrl,
            }));
        } catch (error) {
            console.error('Error fetching payment:', error);
        }
    };

    useEffect(() => {
        if (checkoutUrl) {
            console.log(checkoutUrl);
        }
    }, [checkoutUrl]);

    //open the qr code when checkout url exist
    useEffect(() => {
        if (payOSConfig.CHECKOUT_URL) {
            open();
        }
    }, [payOSConfig.CHECKOUT_URL]);

    //run getpayment when showQR is true
    useEffect(() => {
        if (showQR && !hasFetchedPayment) {
            getPayment();
            setHasFetchedPayment(true);
        }
    }, [showQR, hasFetchedPayment]);

    //cancel when user send request to server
    useEffect(() => {
        if (isCanceled) {
            exit();
            setShowPay(false); // Ensure UI updates
        }
    }, [isCanceled]);

    return (
        <div className='mx-[8%]'>
            <div className='h-12'></div>
            <div className='font-semibold'>
                <form action="">
                    <div className="w-full h-full">
                        <br />
                        <div className='bg-gray-300 w-full h-[70px] flex justify-center items-center'>
                            <h3>Wanna change your address Information? <button><b>Click here</b></button></h3>
                        </div>

                        <hr className="border-t-[1px] border-black my-4"/>

                        <div className='bg-pink-300 w-full h-[100px] flex justify-center items-center'>
                            <p>MY BAE, PAY ME LIKE YOU DO {'<'}3</p>
                        </div>

                        <br />

                        {showQR ? (
                            <div>
                                <div id="embedded-payment-container" className="w-full h-full">
                            </div>

                            <br/>

                            <button
                                type="button"
                                className="w-full bg-red-500 text-white border border-black px-4 py-2 hover:bg-red-600"
                                onClick={() => {
                                    exit();
                                    setShowPay(false)
                                }}
                            >
                                I DON'T WANT TO PAY
                            </button>

                            </div>
                        ) : null}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Pay;