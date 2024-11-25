import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { host } from "../../config.js";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

const ProductLink = ({ to, children, img }) => {
    return (
        <Link to={to}>
            <div className="h-60 w-44 ml-5 mr-5 rounded-3xl">
                <div className="bg-[#D9D9D9] rounded-t-3xl h-4/5">
                    <img src={img} alt="product" className="w-full h-full object-cover rounded-t-3xl" />
                </div>
                <div className="bg-[#ADADAD] h-1/5 rounded-b-3xl flex justify-center items-center">
                    <h1 className="font-abeezee text-white">{children}</h1>
                </div>
            </div>
        </Link>
    );
};

const Product = () => {
    const [products, setProducts] = useState([]);
    const productIDs = new Set();

    useEffect(() => {
        // Fetch product list
        fetch(`${host}/products/all`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                data.forEach((product) => {
                    if (!productIDs.has(product.productID)) {
                        productIDs.add(product.productID);
                        fetch(`${host}/products/getImage/${product.productID}`)
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }
                                return response.text();
                            })
                            .then((imageBase64) => {
                                setProducts((prevProducts) => [
                                    ...prevProducts,
                                    {
                                        ...product,
                                        productImageBase64: `data:image/jpeg;base64,${imageBase64}`,
                                    },
                                ]);
                            })
                            .catch((error) => {
                                console.error(`Error fetching image for product ${product.productID}:`, error);
                                setProducts((prevProducts) => [
                                    ...prevProducts,
                                    { ...product, productImageBase64: "" }, // Fallback to empty image
                                ]);
                            });
                    }
                });
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, [host]);

    const handleWheel = (apiObj, ev) => {
        if (ev.deltaY < 0) {
            apiObj.scrollPrev(); // Scroll left
        } else if (ev.deltaY > 0) {
            apiObj.scrollNext(); // Scroll right
        }
    };

    return (
        <div className="bg-red-500 w-full flex flex-col justify-center scrollbar-hide">
            <ScrollMenu onWheel={handleWheel} wrapperClassName="no-scrollbar">
                {products.map((product) => (
                    <div key={product.productID} itemID={product.productID} className="mr-5">
                        <ProductLink
                            to={`/product/${product.productID}`}
                            img={product.productImageBase64}
                        >
                            {product.productName}
                        </ProductLink>
                    </div>
                ))}
            </ScrollMenu>
        </div>
    );
};

export default Product;