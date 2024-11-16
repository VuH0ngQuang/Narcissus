import NavBar from "../home/NavBar.jsx";
import Cart from "./Cart.jsx";
// import Comment from "./Comment.jsx";
import Pay from "./Pay.jsx";
// import PayFailed from "./PayInfo.jsx";
// import PaySuccessful from "./PayInfo.jsx";
import OrderSummary from "./OrderSummary.jsx";


const CheckoutPage = () => {
     return (
        <div className=''>
            <NavBar />
            <Cart />

            <NavBar />
            <div className="h-screen w-full flex flex-row">
                <div className="flex-[1.1] bg-gray-200">
                    <Pay />
                </div>
                <div className="flex-[1] bg-gray-100">
                    <OrderSummary />
                </div>
            </div> 

        </div>
     );
}
 
export default CheckoutPage;