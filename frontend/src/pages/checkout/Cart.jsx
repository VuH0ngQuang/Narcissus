import React, { useState, useEffect, useRef } from 'react';
import { host, FEHost } from '../../config.js';

const CartItem = ({ productId, image, name, quantity, price, onQuantityChange, authToken, onCheckboxChange }) => (
    <tr>
        <td className="w-auto"></td>
        <td className="w-[7%] h-[128px]">
            <input type="checkbox" className="w-[20px] h-[20px]" onClick={() => onCheckboxChange(productId, quantity)} />
        </td>
        <td className="w-32 h-32 p-0 border border-black">
            <img src={image} alt={name} className="w-full h-full object-cover" />
        </td>
        <td className="w-[20%] pl-6 border-b text-left font-semibold">
            <p>{name}</p>
            <p>Quantity: <span>{quantity}</span></p>
        </td>
        <td className="w-[20%] border-b text-right font-semibold">
            <p>${(price * quantity).toFixed(2)}</p>
        </td>
        <td className="w-[15%] font-semibold">
            <div className="flex items-center justify-center">
                <button
                    type="button"
                    className="w-8 h-8 border"
                    onClick={async () => {
                        const addToCartData = { productId, quantity: -1 };
                        onQuantityChange(productId, Math.max(quantity - 1, 1));
                        try {
                            const url = `${host}/user/addToCart`;
                            const response = await fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `${authToken}`,
                                },
                                body: JSON.stringify(addToCartData),
                            });

                            if (response.status === 401) {
                                window.location.href = `${FEHost}/login`;
                                return;
                            }

                            if (!response.ok) {
                                onQuantityChange(productId, quantity + 1);
                                const errorData = await response.json();
                                alert(`Add to cart failed: ${errorData.message || 'Unknown Error'}`);
                            }
                        } catch (error) {
                            alert(`An error has occurred: ${error.message}`);
                        }
                    }}
                >
                    -
                </button>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    readOnly
                    className="w-12 h-8 text-center border-t border-b"
                />
                <button
                    type="button"
                    className="w-8 h-8 border"
                    onClick={async () => {
                        const addToCartData = { productId, quantity: +1 };
                        onQuantityChange(productId, quantity + 1);
                        try {
                            const url = `${host}/user/addToCart`;
                            const response = await fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `${authToken}`,
                                },
                                body: JSON.stringify(addToCartData),
                            });

                            if (response.status === 401) {
                                window.location.href = `${FEHost}/login`;
                                return;
                            }

                            if (!response.ok) {
                                onQuantityChange(productId, Math.max(quantity - 1, 1));
                                const errorData = await response.json();
                                alert(`Add to cart failed: ${errorData.message || 'Unknown Error'}`);
                            }
                        } catch (error) {
                            alert(`An error has occurred: ${error.message}`);
                        }
                    }}
                >
                    +
                </button>
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
    const productsIDs = useRef(new Set());
    const [authToken, setAuthToken] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            window.location.href = `${FEHost}/login`;
        } else {
            setAuthToken(token);
        }
    }, []);

    useEffect(() => {
        console.log("Items updated:", items);
    }, [items]);

    useEffect(() => {
        if (!authToken) return;

        fetch(`${host}/user/getCart`, {
            headers: {
                'Authorization': authToken,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status === 401) {
                    window.location.href = `${FEHost}/login`;
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const fetchProductDetails = data.map(product => {
                    if (!productsIDs.current.has(product.productId)) {
                        productsIDs.current.add(product.productId);
                        return fetch(`${host}/products/${product.productId}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }
                                return response.json();
                            })
                            .then(productDetails => ({
                                productId: product.productId,
                                image: `data:image/jpeg;base64,${productDetails.productImageBase64}`,
                                name: productDetails.productName,
                                quantity: product.quantity,
                                price: productDetails.productPrice,
                                authToken: authToken,
                            }))
                            .catch(error => {
                                console.error(`Failed to fetch product ${product.productId}:`, error);
                                return null;
                            });
                    }
                    return Promise.resolve(null);
                });

                Promise.all(fetchProductDetails)
                    .then(fetchedProducts => {
                        setProducts(prevProducts => [
                            ...prevProducts,
                            ...fetchedProducts.filter(Boolean),
                        ]);
                    })
                    .catch(error => console.error('Error fetching product details:', error));
            })
            .catch(error => console.error('Error fetching cart items:', error));
    }, [authToken]);

    const onQuantityChange = (productId, newQuantity) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.productId === productId
                    ? { ...product, quantity: newQuantity }
                    : product
            )
        );
    };

    const onCheckboxChange = (productId, quantity) => {
        setItems(prevItems => {
            const updatedItems = prevItems ? [...prevItems] : []; // Ensure it's an array
            const itemIndex = updatedItems.findIndex(item => item.productId === productId);

            if (itemIndex !== -1) {
                // Remove if already exists
                updatedItems.splice(itemIndex, 1);
            } else {
                // Add new item
                updatedItems.push({ productId, quantity });
            }

            // Store updated items in localStorage
            localStorage.setItem("items", JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const makePurchase = () => {
        const items = JSON.parse(localStorage.getItem("items"));
        if (items) {
            localStorage.setItem("products", JSON.stringify(items));
            localStorage.removeItem("items");
            window.location.href = `${FEHost}/checkout`;
        } else {
            alert("No items selected for purchase.");
        }
    };

    const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

    return (
        <div>
            <div className="h-12"></div>
            <div className="flex flex-col">
                <form>
                    <table className="w-full">
                        <tbody>
                        {products.map(product => (
                            <CartItem
                                key={product.productId}
                                {...product}
                                onQuantityChange={onQuantityChange}
                                onCheckboxChange={onCheckboxChange}
                            />
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="3"></td>
                            <td className="w-[20%] pl-24 text-left font-semibold">Total</td>
                            <td className="w-[20%] pr-6 text-right font-semibold">${total.toFixed(2)}</td>
                            <td colSpan="3"></td>
                        </tr>
                        <tr>
                            <td colSpan="3"></td>
                            <td colSpan="2" className="pl-24 h-16 font-semibold">
                                <button className="w-full py-2 px-4 bg-black text-white border"
                                        type="button"
                                        onClick={makePurchase}>
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