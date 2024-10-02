import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/HomePage.jsx';
import Login from './pages/account/Login.jsx';
import Register from "./pages/account/Register.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;