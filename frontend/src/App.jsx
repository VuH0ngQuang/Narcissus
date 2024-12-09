import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/HomePage.jsx';
import Login from './pages/account/Login.jsx';
import Register from "./pages/account/Register.jsx";
import AdminDashboard from "./pages/account/admin/AdminDashboard.jsx";
import ProductDetailPage from './pages/products/ProductDetailPage.jsx';
import Order from "./pages/account/admin/Order.jsx";
import PurchasedProduct1 from "./pages/purchasedProduct/PurchasedProduct1.jsx";
import PurchasedProduct2 from "./pages/purchasedProduct/PurchasedProduct2.jsx";
import SellerDashboard from "./pages/editProduct/SellerDashboard.jsx";
import EditProduct from "./pages/editProduct/EditProduct.jsx";
import NavBar from "./pages/home/NavBar.jsx";
import CheckoutPage from "./pages/checkout/CheckoutPage.jsx";
import Cart from "./pages/checkout/Cart.jsx";
import {PayFailed, PaySuccessful} from "./pages/checkout/PayInfo.jsx";

const App = () => {
    return (
        <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/admin/addproduct" element={<h1>Not Found</h1>} />
                    <Route path="/admin/updateproduct" element={<h1>Not Found</h1>} />
                    <Route path="/admin/order" element={<Order />} />
                    <Route path="/orders" element={<PurchasedProduct1 />} />
                    <Route path="/purchasedproduct2" element={<PurchasedProduct2 />} />
                    <Route path="/editproduct" element={<EditProduct />} />
                    <Route path="/sellerdashboard" element={<SellerDashboard />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/successful" element={<PaySuccessful />} />
                    <Route path="/failed" element={<PayFailed />} />
                </Routes>
        </BrowserRouter>
    );
}

export default App;