import { useState, useEffect } from 'react';

const UseAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);  // Thêm loading để xử lý trạng thái khi đang kiểm tra token
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            if (!location.state) {
                location.state = { from: location.pathname };  // Lưu đường dẫn ban đầu
            }
            window.location.href = `${FEHost}`+'/login', { state: { from: location.pathname } };
        }
        setLoading(false);  // Đảm bảo loading được tắt sau khi kiểm tra
    }, [location, navigate]);

    if (loading) {
        return <div>Loading...</div>;  // Hiển thị loading khi kiểm tra token
    }

    return isAuthenticated;
};

export default UseAuth;
