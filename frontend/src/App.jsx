import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/HomePage.jsx';
import Login from './pages/account/Login.jsx';
import Register from "./pages/account/Register.jsx";
import ForgottenPassword from './pages/account/ForgottenPassword.jsx';
import AdminDashboard from "./pages/account/admin/AdminDashBoard.jsx";
import ProductDetailPage from './pages/products/ProductDetailPage.jsx';
import Order from "./pages/account/admin/Order.jsx";
import Detail from "./pages/account/admin/Detail.jsx";
import Update from "./pages/account/admin/Update.jsx";
import Add from "./pages/account/admin/Add.jsx";
import PurchasedProduct1 from "./pages/purchasedProduct/PurchasedProduct1.jsx";
import PurchasedProduct2 from "./pages/purchasedProduct/PurchasedProduct2.jsx";
import SellerDashboard from "./pages/editProduct/SellerDashboard.jsx";
import EditProduct from "./pages/editProduct/EditProduct.jsx";
import NavBar from "./pages/home/NavBar.jsx";
import CheckoutPage from "./pages/checkout/CheckoutPage.jsx";
import Cart from "./pages/checkout/Cart.jsx";
import { PayFailed, PaySuccessful } from "./pages/checkout/PayInfo.jsx";
import clarity from '@microsoft/clarity';
import { useEffect } from "react";
import { host } from "./config.js";

const App = () => {

    useEffect(() => {
        const projectId = "p1uwyhlg5q";
        clarity.init(projectId);

        const renewToken = async () => {
            const authToken = localStorage.getItem('authToken');
            if (authToken) {
                try {
                    const response = await fetch(`${host}/api/auth/renew`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': authToken
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const { accessToken, tokenType, role } = data;
                        const fullToken = `${tokenType.trim()} ${accessToken.trim()}`;
                        localStorage.setItem('authToken', fullToken);
                        localStorage.setItem('role', role);
                    } else {
                        console.error('Failed to renew token');
                    }
                } catch (error) {
                    console.error('An error occurred while renewing token:', error);
                }
            }
        };

        const intervalId = setInterval(renewToken, 240000); // 4 minutes in milliseconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />             {/*done*/}
                <Route path="/login" element={<Login />} />             {/*done*/}
                <Route path="/register" element={<Register />} />             {/*done*/}
                <Route path="/forgottenpassword" element={<ForgottenPassword />} />             {/*done*/}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />             {/*done*/}
                <Route path="/admin/updateproduct/:productID" element={<Update />} />
                <Route path="/admin/addproduct" element={<Add />} />
                <Route path="/admin/order" element={<Order />} />
                <Route path="/admin/vieworder/:orderID" element={<Detail />} />
                <Route path="/orders" element={<PurchasedProduct1 />} />             {/*done*/}
                <Route path="/orders/:orderId" element={<PurchasedProduct2 />} />             {/*done*/}
                <Route path="/editproduct" element={<EditProduct />} />
                <Route path="/sellerdashboard" element={<SellerDashboard />} />
                <Route path="/checkout" element={<CheckoutPage />} />             {/*done*/}
                <Route path="/cart" element={<Cart />} />             {/*done*/}
                <Route path="/successful" element={<PaySuccessful />} />             {/*done*/}
                <Route path="/failed" element={<PayFailed />} />             {/*done*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;