import { useLocation } from "react-router-dom";

const UpdateProduct = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    return (
        <div>
            <h1>Update Product {id}</h1>
            {/* Thêm logic cập nhật sản phẩm ở đây */}
        </div>
    );
};

export default UpdateProduct;
