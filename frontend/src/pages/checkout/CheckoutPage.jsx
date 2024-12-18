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
                    />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
