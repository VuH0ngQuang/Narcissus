import { useParams } from "react-router-dom";
import combine from '../../assets/combine.png';
import { useEffect, useState } from "react";
import { FEHost, host } from "../../config.js";

const ProductDetailPage = () => {
    const { id } = useParams();
    const productId = parseInt(id);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    function isLogin() {
        if (localStorage.getItem('authToken') == null) return false;
        return true;
    }

    const addToCart = async (e) => {
        const addToCartData = { productId, quantity };

        if (isLogin()) {
            const authToken = localStorage.getItem('authToken');
            if (!authToken || typeof authToken !== 'string') {
                window.location.href = `${FEHost}/login`;
                return;
            }

            try {
                const url = `${host}/user/addToCart`;
                console.log('Adding to cart with URL:', url);
                console.log('Authorization Token:', authToken); // Debug the token

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

                if (response.ok) {
                    console.log("Done without error");
                    window.location.href = `${FEHost}/cart`;
                } else {
                    const errorData = await response.json();
                    alert(`Add to cart failed: ${errorData.message || 'Unknown Error'}`);
                }
            } catch (error) {
                alert(`An error has occurred: ${error.message}`);
            }
        } else {
            window.location.href = `${FEHost}/login`;
        }
    };

    const buyNow = async () => {
        let product = { productId, quantity };
        localStorage.removeItem("products");
        if (isLogin()) {
            localStorage.setItem("products", JSON.stringify(product));
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${host}/products/${id}`);
                if (response.ok) {
                    const productData = await response.json();
                    setProduct(productData);
                } else {
                    console.error('Failed to fetch product');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <div className="pt-12 flex flex-col md:flex-row justify-center items-center md:items-start m-10">
                <div className="w-full md:w-1/2 flex justify-center">
                    {product.productImageBase64 ? (
                        <img
                            src={`data:image/jpeg;base64,${product.productImageBase64}`}
                            alt={product.name}
                            className="rounded-lg w-full h-auto max-h-[80vh] object-cover"
                            style={{ maxWidth: '90vw' }}
                        />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>

                <div className="w-full md:w-1/2 mt-10 md:mt-0 md:ml-10">
                    <h1 className="text-3xl font-bold mb-4">{product.productName} - ${product.productPrice}</h1>
                    <p className="text-gray-600 mb-6">
                        {product.productInfo}
                    </p>
                    <p className="text-gray-500 mb-6">
                        <strong>Units Sold:</strong> {product.sold}
                    </p>

                    <div className="flex items-center mb-6">
                        <span className="mr-4">Quantity</span>
                        <div className="flex items-center border rounded-md p-1">
                            <button className="px-2" onClick={decrementQuantity}>-</button>
                            <span className="px-4">{quantity}</span>
                            <button className="px-2" onClick={incrementQuantity}>+</button>
                        </div>
                    </div>

                    <div className="mt-8 text-left">
                        <h2 className="text-xl font-semibold mb-4">Excellent Combination with:</h2>
                        <img
                            src={combine}
                            alt="Excellent Combination"
                            className="w-80 h-auto rounded-md"
                            style={{ maxWidth: '100%' }}
                        />
                    </div>

                    <div className="flex justify-start mt-6">
                        <button onClick={addToCart} className="bg-black text-white px-8 py-3 rounded-lg mr-4">
                            ADD TO CART
                        </button>
                        <button onClick={buyNow} className="bg-[#FF0099] text-white px-8 py-3 rounded-lg">
                            BUY NOW
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetailPage;