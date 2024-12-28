import { useParams } from "react-router-dom";
import combine from '../../assets/combine.png';
import { useEffect, useState } from "react";
import {FEHost, host} from "../../config.js";
import Product from '../../utils/Product.js'

const ProductDetailPage = () => {
    const { id } = useParams();
    const productId = parseInt(id);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const [stars, setStars] = useState(0);
    const [content, setContent] = useState("");
    const [reviews, setReviews] = useState([]);
    const [authToken] = useState(localStorage.getItem("authToken"));

    const incrementQuantity = async () => {
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
        }
        
        if (product.productStockQuantity === 0 ) setQuantity(0);
        setQuantity(prevQuantity => 
            prevQuantity < product.productStockQuantity ? prevQuantity + 1 : product.productStockQuantity
        );    
    };

    const decrementQuantity = () => {
        if (product.productStockQuantity === 0 ) setQuantity(0);
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    function isLogin() {
        if (authToken == null) return false;
        return true;
    }

    const addToCart = async () => {
        const addToCartData = { productId, quantity };

        if (isLogin()) {
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
        if (isLogin()) {
            localStorage.removeItem("products");
            localStorage.setItem("products", JSON.stringify([product]));
            window.location.href = `${FEHost}/checkout`;
        }
    };

    const addNotify = async () => {
        if (!isLogin()){
            window.location.href = `${FEHost}/login`
        } else {
            try {
                fetch(`${host}/products/addNotify/${id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `${authToken}`
                    }
                }).then( (response) => {
                    if (response.status === 401) window.location.href = `${FEHost}/login`
                    if (response.ok) alert("Done")
                })
            } catch (error) {
                alert(`An error has occurred: ${error.message}`);
            }
        }
    }

    const submitReview = async () => {
        if (!isLogin()) {
            window.location.href = `${FEHost}/login`;
            return;
        }

        if (!content.trim() || stars < 1 || stars > 5) {
            alert("Please provide valid feedback and a star rating.");
            return;
        }

        try {
            const response = await fetch(`${host}/products/review/add/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken,
                },
                body: JSON.stringify({ content, stars }),
            });

            if (response.ok) {
                const review = await response.json();
                setReviews(prev => [review, ...prev]); // Add new review to the list
                setContent("");
                setStars(0);
            } else {
                alert("Failed to submit review.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await fetch(`${host}/products/review/getAll/${id}`);
            if (response.ok) {
                const data = await response.json();
                setReviews(data);
            } else {
                console.error("Failed to fetch reviews.");
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
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
        fetchReviews();
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
                            alt={product.productName}
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
                        <strong>Stock quantity:</strong> {product.productStockQuantity}
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
                        {product.productStockQuantity !== 0 ?
                            <div>
                                <button onClick={addToCart} className="bg-black text-white px-8 py-3 rounded-lg mr-4"> ADD TO CART </button>
                                <button onClick={buyNow} className="bg-[#FF0099] text-white px-8 py-3 rounded-lg"> BUY NOW </button>
                            </div> :
                            <button onClick={addNotify} className="bg-red-700 text-white px-8 py-3 rounded-lg"> Email me when restock </button>
                        }
                        {/*<button onClick={addToCart} className="bg-black text-white px-8 py-3 rounded-lg mr-4">*/}
                        {/*    ADD TO CART*/}
                        {/*</button>*/}
                        {/*<button onClick={buyNow} className="bg-[#FF0099] text-white px-8 py-3 rounded-lg">*/}
                        {/*    BUY NOW*/}
                        {/*</button>*/}
                        {/*<button onClick={buyNow} className="bg-red-700 text-white px-8 py-3 rounded-lg">*/}
                        {/*    Email me when restock*/}
                        {/*</button>*/}
                    </div>


                </div>
            </div>

            <div className="pt-12 m-10">
                {/* Existing product details */}
                        
                        {/* Feedback form */}
                        <div className="w-full md:w-1/2 mt-10 md:mt-0 md:ml-10">
                            <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
                            <div className="mb-4 flex items-center">
                                <span>Rate:</span>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            className={`px-2 ${stars >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                            onClick={() => setStars(star)}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <textarea
                                className="w-full border rounded-md p-2 resize-none"
                                rows="4"
                                placeholder="Write your review..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                            <button
                                className="bg-black text-white px-8 py-2 rounded-lg mt-4"
                                onClick={submitReview}
                            >
                                Submit Review
                            </button>

                            {/* Display reviews */}
                            <div className="mt-8">
                                <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
                                {reviews.length > 0 ? (
                                    reviews.map((review, index) => (
                                        <div key={index} className="border-b border-gray-300 pb-4 mb-4">
                                            <p className="text-lg font-bold">{review.userName}</p>
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <span
                                                        key={star}
                                                        className={`px-1 ${review.stars >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-gray-600">{review.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
        </>
    );
};

export default ProductDetailPage;