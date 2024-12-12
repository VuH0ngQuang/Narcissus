import { useState, useEffect } from "react";
import Pay from "./Pay.jsx";
import Comment from "./Comment.jsx";
import OrderSummary from "./OrderSummary.jsx";
import {FEHost, host} from "../../config.js";

const CheckoutPage = () => {
    const [showPay, setShowPay] = useState(true);
    const [authToken, setAuthToken] = useState('');
    const [showQR, setShowQR] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [isCanceled, setIsCancel] = useState(false);

    //check login
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            window.location.href = `${FEHost}/login`;
        } else {
            setAuthToken(token);
        }
    }, []);

    //handle when the user close tab
    useEffect(() => {
        const handleBeforeUnload = () => {
            const url = `${host}/orders/forTesting`;
            const data = null;
            const blob = new Blob([data], { type: "application/json" });
            navigator.sendBeacon(url, blob);
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    });

    return (
        <div className='scrollbar-hide'>
            <div className="h-screen w-full flex flex-row">
                <div className="flex-[1.1] border-r-[1px] border-black">
                    {showPay ? <Pay
                        setShowPay={setShowPay}
                        showQR={showQR}
                        orderId={orderId}
                        setOrderId={setOrderId}
                        isCanceled={isCanceled} /> : <Comment
                                                        setShowPay={setShowPay}
                                                        orderId={orderId}
                                                        setIsCancel={setIsCancel}/>}
                </div>
                <div className="flex-[1] bg-gray-100">
                    <OrderSummary setShowQR={setShowQR} showQR={showQR}/>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;