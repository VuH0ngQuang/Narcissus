import NavBar from "../home/NavBar.jsx";
import Cart from "./Cart.jsx";
import Pay from "./Pay.jsx";
import Comment from "./Comment.jsx";
import { PayFailed, PaySuccessful } from './PayInfo.jsx';
import OrderSummary from "./OrderSummary.jsx";


const CheckoutPage = () => {
     return (
        <div className=''>
            <Cart />
            <div className="h-screen w-full flex flex-row">
                <div className="flex-[1.1] border-r-[1px] border-black">
                    <Pay />
                </div>
                <div className="flex-[1] bg-gray-100 ">
                    <OrderSummary />
                </div>
            </div>
            <div className="h-screen w-full flex flex-row">
                <div className="flex-[1.1] border-r-[1px] border-black">
                   <Comment/>
                </div>
                <div className="flex-[1] bg-gray-100 ">
                    <OrderSummary />
                </div>
            </div>
            <PayFailed/>
            <PaySuccessful/>
        </div>
     );
}
 
export default CheckoutPage;