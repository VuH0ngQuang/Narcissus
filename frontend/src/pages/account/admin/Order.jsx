const Order  = () => {
    return (
        <div className={'bg-red-700 flex flex-row h-screen w-screen justify-center items-center'}>
            <div className={'bg-blue-700 h-[95%] w-[20%] mr-4'}>
                <div>
                    <div className={'bg-pink-600 h-auto flex flex-col justify-center items-center'}>
                        <p className={'text-xs'}>Vũ Hồng Quang</p>
                        <p className={'text-xs'}>Home/Projects/Articles/Contact</p>
                        <p className={'text-xs'}>Frontend Developer</p>
                        <p className={'text-xs'}>html only with proper layout, no styling</p>
                    </div>
                </div>
            </div>
            <div className={'bg-yellow-500 h-[95%] w-[75%] ml-4'}>
                test 2
            </div>
        </div>
    );
}

export default Order;


// import NavBar from "../home/NavBar.jsx";
// import OrderList from "./OrderList.jsx"
//
// const Order = () => {
//     return (
//         <div>
//             <NavBar />
//             <OrderList />
//         </div>
//     );
// }
//
// export default Order;