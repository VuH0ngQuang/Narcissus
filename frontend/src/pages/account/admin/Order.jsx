import UseAuth from '../UseAuth.jsx';
import OrderList from "./OrderList.jsx"

const Order = () => {
    UseAuth('ROLE_ADMIN');

    return (
        <div>
            <OrderList />
        </div>
    );
}

export default Order;