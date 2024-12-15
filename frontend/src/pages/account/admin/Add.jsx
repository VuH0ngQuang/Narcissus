import AddProduct from "./AddProduct.jsx"
import UseAuth from '../UseAuth.jsx';


const Add = () => {
    UseAuth('ROLE_ADMIN');


    return (
        <div>
            <AddProduct />
        </div>
    );
}

export default Add;