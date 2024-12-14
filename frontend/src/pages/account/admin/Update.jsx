import UseAuth from '../UseAuth.jsx';
import UpdateProduct from "./UpdateProduct.jsx"

const Update = () => {
    UseAuth('ROLE_ADMIN');


    return (
        <div>
            <UpdateProduct />
        </div>
    );
}

export default Update;