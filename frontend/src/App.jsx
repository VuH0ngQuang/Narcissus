import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/HomePage.jsx';
import Login from './pages/account/Login.jsx';
import Register from "./pages/account/Register.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProductDetailPage from './pages/home/products/ProductDetailPage.jsx';
import Order from "./pages/admin/Order.jsx"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/product/:id" element={<ProductDetailPage />} /> {/* Add this line */}
                <Route path="/admin/addproduct" element={<h1>Not Found</h1>} />
                <Route path="/admin/updateproduct" element={<h1>Not Found</h1>} />
                <Route path="/admin/order" element={<Order />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;