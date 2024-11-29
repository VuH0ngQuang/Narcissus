import React from 'react';
import Banner1 from '../../assets/banner2.jpg';

const CartItem = ({ image, name, quantity, price }) => (
    <tr>
        <td className="w-auto"></td>
        <td className="w-[7%] h-[128px]">
            <input type="checkbox" className="w-[20px] h-[20px]" />
        </td>
        <td className="w-32 h-32 p-0 border border-black">
            <img src={image} alt={name} className="w-full h-full object-cover" />
        </td>
        <td className="w-[20%] pl-6 border-b text-left font-semibold">
            <p>{name}</p>
            <p>
                Quantity: <span>{quantity}</span>
            </p>
        </td>
        <td className="w-[20%] border-b text-right font-semibold">
            <p>${price}</p>
        </td>
        <td className="w-[15%] font-semibold">
            <div className="flex items-center justify-center">
                <button className="w-8 h-8 border">-</button>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    readOnly
                    className="w-12 h-8 text-center border-t border-b"
                />
                <button className="w-8 h-8 border">+</button>
            </div>
        </td>
        <td className="w-[160px]">
            <button className="w-full bg-red-500 text-black border border-black rounded-full px-4 py-2 hover:bg-red-600">
                Remove
            </button>
        </td>
        <td className="w-auto"></td>
    </tr>
);

const Cart = () => {
    const cartItems = [
        { image: Banner1, name: 'SnowFall', quantity: 1, price: 100 },
        { image: Banner1, name: 'SnowFall', quantity: 1, price: 100 },
    ];

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="">
            <div className="h-12"></div>
            <div className="flex flex-col">
                <form>
                    <table className="w-full">
                        {cartItems.map((item, index) => (
                            <CartItem key={index} {...item} />
                        ))}
                        <tbody>
                        <tr>
                            <td colSpan="3"></td>
                            <td className="w-[20%] pl-24 text-left font-semibold">Total</td>
                            <td className="w-[20%] pr-6 text-right font-semibold">${total}</td>
                            <td colSpan="3"></td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="2" className="pl-24 h-16 font-semibold">
                                <button className="w-full py-2 px-4 bg-black text-white border">
                                    MAKE A PURCHASE
                                </button>
                            </td>
                            <td colSpan="3"></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default Cart;
