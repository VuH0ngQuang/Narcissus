import Banner1 from '../../assets/banner2.jpg';
import { usePayOS } from "@payos/payos-checkout";
import { useEffect, useState } from "react";
import { FEHost, host } from "../../config.js";

const Pay = ({ setShowPay, showQR, orderId, setOrderId, isCanceled, setIsCreatingLink, isCreatingLink, setIsPaid }) => {
    const [checkoutUrl, setCheckoutUrl] = useState('');
    const [authToken] = useState(localStorage.getItem('authToken'));
    const [hasFetchedPayment, setHasFetchedPayment] = useState(false);
    const [countdown, setCountdown] = useState(300); // Countdown timer state

    const [payOSConfig, setPayOSConfig] = useState({
        RETURN_URL: window.location.origin, // required
        ELEMENT_ID: "embedded-payment-container", // required
        CHECKOUT_URL: null, // required
        embedded: true, // Nếu dùng giao diện nhúng
        onSuccess: (event) => {
            setIsPaid(true);
            localStorage.removeItem('products');
            window.location.href = `${FEHost}/successful`;
        },
        onCancel: (event) => {
            localStorage.removeItem('products');
            window.location.href = `${FEHost}/failed`;
        },
        onExit: (event) => {
            localStorage.removeItem('products');
            window.location.href = `${FEHost}/failed`;
        }
    });

    const { open, exit } = usePayOS(payOSConfig);

    const getPayment = async () => {
        if (localStorage.getItem('products') !== null) {
            console.log(isCreatingLink)
            try {
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
            } finally {
                setIsCreatingLink(false);
            }
        } else {
            console.log('No products found in localStorage.');
            return;
        }
    };

    useEffect(() => {
        if (checkoutUrl) {
            console.log(checkoutUrl);
        }
    }, [checkoutUrl]);

    useEffect(() => {
        if (payOSConfig.CHECKOUT_URL) {
            open();
        }
    }, [payOSConfig.CHECKOUT_URL]);

    useEffect(() => {
        if (showQR && !hasFetchedPayment) {
            getPayment();
            setHasFetchedPayment(true);
        }
    }, [showQR, hasFetchedPayment]);

    useEffect(() => {
        if (isCanceled) {
            exit();
            setShowPay(false);
        }
    }, [isCanceled]);

    // Countdown logic
    useEffect(() => {
        let timer;
        if (showQR && countdown > 0 && !isCreatingLink) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }

        if (countdown === 0) {
            const cancelData = { orderId: orderId, reason: 'SYSTEM: PAYMENT TIME OUT' };
            fetch(`${host}/payment/cancel-payment`, {
                headers: {
                    'Authorization': authToken,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(cancelData)
            }).then(response => {
                if (!response.ok) {
                    console.log('Some thing wrong, check the system');
                }
                if (response.status === 401) {
                    window.location.href = `${FEHost}/login`;
                } else {
                    window.location.href = `${FEHost}/orders`;
                }
            });
        }

        return () => clearInterval(timer);
    }, [showQR, countdown, isCreatingLink]);

    return (
        <div className='mx-[8%] scrollbar-hide'>
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
                                <div id="embedded-payment-container" className="w-full h-[330px] mt-8 mb-8"></div>

                                <button
                                    type="button"
                                    className={`w-full text-white border border-black px-4 py-2 relative overflow-hidden ${countdown > 10 ? 'bg-blue-500' : 'bg-red-500'} hover:opacity-90`}
                                    style={{ position: 'relative' }}
                                >
                                    <span className="absolute inset-0 flex justify-center items-center text-xl font-bold">
                                        {countdown > 0? countdown : 'Time Up!'}
                                    </span>
                                    <span
                                        className="absolute inset-0 bg-black opacity-20"
                                        style={{
                                            width: `${(countdown / 30) * 100}%`,
                                            transition: 'width 1s linear',
                                        }}
                                    ></span>
                                </button>

                                <br/>

                                {!isCreatingLink ? (
                                    <button
                                        type="button"
                                        className="w-full bg-red-500 text-white border border-black px-4 py-2 hover:bg-red-600"
                                        onClick={() => {
                                            exit();
                                            setShowPay(false);
                                        }}
                                    >
                                        I DON'T WANT TO PAY
                                    </button>
                                ): null}
                            </div>
                        ) : null}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Pay;
