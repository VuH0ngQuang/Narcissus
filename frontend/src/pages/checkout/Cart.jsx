import React, { useEffect, useState } from 'react';
import { FEHost, host } from "../../config.js";

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
            <p>Quantity: <span>{quantity}</span></p>
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
    const [products, setProducts] = useState([]);
    const productsIDs = new Set();
    let authToken = useState([]);

    if (localStorage.getItem('authToken') == null) {
        window.location.href = `${FEHost}/login`;
    } else authToken = localStorage.getItem('authToken');

    useEffect(() => {
        fetch(`${host}/user/getCart`, {
            headers: {
                'Authorization': `${authToken}`, // Add the JWT token to the Authorization header
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const fetchProductDetails = data.map((product) => {
                    if (!productsIDs.has(product.productId)) {
                        productsIDs.add(product.productId);
                        return fetch(`${host}/products/${product.productId}`)
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }
                                return response.json();
                            })
                            .then((productDetails) => ({
                                image: `data:image/jpeg;base64,${productDetails.productImageBase64}`,
                                name: productDetails.productName,
                                quantity: product.quantity,
                                price: productDetails.productPrice
                            }));
                    }
                    return Promise.resolve(product);
                });

                Promise.all(fetchProductDetails)
                    .then((products) => setProducts(products))
                    .catch((error) => console.error('Error fetching product details:', error));
            })
            .catch((error) => console.error('Error fetching cart items:', error));
    }, [authToken]);

    const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

    return (
        <div className="">
            <div className="h-12"></div>
            <div className="flex flex-col">
                <form>
                    <table className="w-full">
                        <tbody>
                        {products.map((product) => (
                            <CartItem key={product.productId} {...product} />
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="3"></td>
                            <td className="w-[20%] pl-24 text-left font-semibold">Total</td>
                            <td className="w-[20%] pr-6 text-right font-semibold">${total}</td>
                            <td colSpan="3"></td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="2" className="pl-24 h-16 font-semibold">
                                <button className="w-full py-2 px-4 bg-black text-white border">
                                    MAKE A PURCHASE
                                </button>
                            </td>
                            <td colSpan="3"></td>
                        </tr>
                        </tfoot>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default Cart;