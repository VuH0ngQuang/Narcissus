import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pay from "./Pay.jsx";
import Comment from "./Comment.jsx";
import OrderSummary from "./OrderSummary.jsx";
import { FEHost, host } from "../../config.js";

const CheckoutPage = () => {
    const [showPay, setShowPay] = useState(true);
    const [authToken, setAuthToken] = useState('');
    const [showQR, setShowQR] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [isCanceled, setIsCancel] = useState(false);
    const [isCreatingLink, setIsCreatingLink] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [isPaymentInitiated, setIsPaymentInitiated] = useState(false); // New state to track payment initiation
    const navigate = useNavigate();
    const location = useLocation();

    // Check login
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            window.location.href = `${FEHost}/login`;
        } else {
            setAuthToken(token);
        }
    }, []);

    // Handle when the user closes the tab
    useEffect(() => {
        const cancelData = { orderId, reason: 'SYSTEM: User close the tab', authToken };
        const handleBeforeUnload = () => {
            if (!isPaid && isPaymentInitiated) {
                const url = `${host}/payment/closed-tab`;
                const data = JSON.stringify(cancelData);
                const blob = new Blob([data], { type: "application/json" });
                navigator.sendBeacon(url, blob);
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [orderId, isPaid, authToken, isPaymentInitiated]);

    // Handle URL changes (detect navigation away from the page)
    useEffect(() => {
        const cancelData = { orderId, reason: 'SYSTEM: User navigated away', authToken };

        // If user navigates away (URL change), send cancellation info
        if (!isPaid && isPaymentInitiated) {
            const url = `${host}/payment/closed-tab`;
            const data = JSON.stringify(cancelData);
            const blob = new Blob([data], { type: "application/json" });
            navigator.sendBeacon(url, blob);
        }
    }, [location, orderId, isPaid, authToken, isPaymentInitiated]); // Trigger effect when location changes

    return (
        <div className="scrollbar-hide">
            <div className="h-screen w-full flex flex-row">
                <div className="flex-[1.1] border-r-[1px] border-black">
                    {showPay ? (
                        <Pay
                            setShowPay={setShowPay}
                            showQR={showQR}
                            orderId={orderId}
                            setOrderId={setOrderId}
                            isCanceled={isCanceled}
                            setIsCreatingLink={setIsCreatingLink}
                            isCreatingLink={isCreatingLink}
                            setIsPaid={setIsPaid}
                        />
                    ) : (
                        <Comment
                            setShowPay={setShowPay}
                            orderId={orderId}
                            setIsCancel={setIsCancel}
                        />
                    )}
                </div>
                <div className="flex-[1] bg-gray-100">
                    <OrderSummary
                        setShowQR={setShowQR}
                        showQR={showQR}
                        setIsPaymentInitiated={setIsPaymentInitiated}
                        isPaymentInitiated={isPaymentInitiated}
                    />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;