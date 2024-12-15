import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/HomePage.jsx';
import Login from './pages/account/Login.jsx';
import Register from "./pages/account/Register.jsx";
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
import {PayFailed, PaySuccessful} from "./pages/checkout/PayInfo.jsx";
import clarity from '@microsoft/clarity';
import {useEffect} from "react";


const App = () => {

    useEffect(() => {
        const projectId = "p1uwyhlg5q";
        clarity.init(projectId);
    }, []);

    return (
        <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />             {/*done*/}
                    <Route path="/login" element={<Login />} />             {/*done*/}
                    <Route path="/register" element={<Register />} />             {/*done*/}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />             {/*done*/}
                    <Route path="/admin/updateproduct/:productID" element={<Update/>} />
                    <Route path="/admin/addproduct" element={<Add/>} />
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