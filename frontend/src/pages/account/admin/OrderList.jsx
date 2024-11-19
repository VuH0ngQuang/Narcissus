import { Link } from "react-router-dom";

const List = ({cusid, proid, proname, orderdate, quantity, orderstatus}) => {
    return (
        <div className='flex flex-row h-10'>
            <div className=' w-1/12 flex justify-center items-center'>
                <h1>{cusid}</h1>
            </div>
            <div className='w-1/12 flex justify-center items-center'>
                <h1>{proid}</h1>
            </div>
            <div className='w-5/12 flex justify-center items-center'>
                <h1>{proname}</h1>
            </div>
            <div className='w-3/12 flex justify-center items-center'>
                <h1>{orderdate}</h1>
            </div>
            <div className='w-1/12 flex justify-center items-center'>
                <h1>{quantity}</h1>
            </div>
            <div className='w-1/12 flex justify-center items-center'>
                <h1>{orderstatus}</h1>
            </div>
        </div>
    );
};


const OrderList = () => {
    return (
        <div className='h-screen divide-y-2 divide-black'>
            <div className='h-12'></div>
            <div>
                <div className=' flex flex-row'>
                    <h1 className='text-6xl font-abeezee ml-10 mb-5 mt-5'>Order</h1>
                    <div className=' flex flex-grow items-center justify-end'>
                        <div
                            className='bg-[#00FF0A] border-2 border-black font-abeezee bg-opacity-50 h-10 w-40 rounded-xl flex mr-36'>
                            <Link to='/admin/dashboard'
                                  className='h-full w-full justify-center flex items-center font-abeezee '>Return</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-14'></div>
            <div className='flex flex-row h-10'>
                <div className=' w-1/12 flex justify-center items-center'>
                    <h1>Customer ID</h1>
                </div>
                <div className='w-1/12 flex justify-center items-center'>
                    <h1>Product ID</h1>
                </div>
                <div className='w-5/12 flex justify-center items-center'>
                    <h1>Product Name</h1>
                </div>
                <div className='w-3/12 flex justify-center items-center'>
                    <h1>Order On</h1>
                </div>
                <div className='w-1/12 flex justify-center items-center'>
                    <h1>Quantity</h1>
                </div>
                <div className='w-1/12 flex justify-center items-center'>
                    <h1>Status</h1>
                </div>
            </div>
            <div className=" overflow-scroll scrollbar-hide h-[calc(100%-3.5rem-2.5rem-3rem-6.38rem)]">
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
                <List cusid={1} proid={1} proname={"Sunflower"} orderdate={"10/4/2024"} quantity={10} orderstatus={"Delivering"}></List>
            </div>
        </div>
    );
}

export default OrderList;