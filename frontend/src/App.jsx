import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/HomePage.jsx';
import Login from './pages/account/Login.jsx';
import Register from "./pages/account/Register.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProductDetailPage from './pages/home/products/ProductDetailPage.jsx';
import Order from "./pages/admin/Order.jsx"
import PurchasedProduct1 from "./pages/test/PurchasedProduct1.jsx";
import PurchasedProduct2 from "./pages/test/PurchasedProduct2.jsx";
import SellerDashboard from "./pages/test/SellerDashboard.jsx";
import EditProduct from "./pages/test/EditProduct.jsx";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/admin/addproduct" element={<h1>Not Found</h1>} />
                <Route path="/admin/updateproduct" element={<h1>Not Found</h1>} />
                <Route path="/admin/order" element={<Order />} />
                <Route path="/purchasedproduct1" element={<PurchasedProduct1 />} />
                <Route path="/purchasedproduct2" element={<PurchasedProduct2 />} />
                <Route path="/editproduct" element={<EditProduct />} />
                <Route path="/sellerdashboard" element={<SellerDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;