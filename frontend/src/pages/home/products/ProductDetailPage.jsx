import { useParams } from "react-router-dom";
import NavBar from '../NavBar.jsx';
import product1 from '../../../assets/product1.jpg';
import product2 from '../../../assets/product1.jpg'; // Add more product images as needed
import product3 from '../../../assets/product1.jpg';
import product4 from '../../../assets/product1.jpg';
import product5 from '../../../assets/product1.jpg';
import product6 from '../../../assets/product1.jpg';
import product7 from '../../../assets/product1.jpg';
import product8 from '../../../assets/product1.jpg';

// Predefined list of products
const products = [
    { id: 1, name: "Rosy Delight", price: "$100", description: "A beautiful bouquet of roses.", img: product1 },
    { id: 2, name: "Sunshine Bundle", price: "$80", description: "Bright sunflowers to make your day.", img: product2 },
    { id: 3, name: "Sunshine Bundle", price: "$80", description: "Bright sunflowers to make your day.", img: product3 },
    { id: 4, name: "Sunshine Bundle", price: "$80", description: "Bright sunflowers to make your day.", img: product4 },
    { id: 5, name: "Sunshine Bundle", price: "$80", description: "Bright sunflowers to make your day.", img: product5 },
    { id: 6, name: "Sunshine Bundle", price: "$80", description: "Bright sunflowers to make your day.", img: product6 },
    { id: 7, name: "Sunshine Bundle", price: "$80", description: "Bright sunflowers to make your day.", img: product7 },
    { id: 8, name: "Sunshine Bundle", price: "$80", description: "Bright sunflowers to make your day.", img: product8 },

    // Add more products as needed
];

const ProductDetailPage = () => {
    const { id } = useParams();
    const productId = parseInt(id); // Convert the id param to a number
//hehe
    // Find the product by id
    const product = products.find(p => p.id === productId);

    if (!product) {
        return <h1>Product not found</h1>;
    }

    return (
        <>
            <NavBar />
            <div className="pt-12 flex flex-col md:flex-row justify-center items-center md:items-start m-10">
                <div className="w-full md:w-1/2 flex justify-center">
                    <img src={product.img} alt={product.name} className="rounded-lg w-4/5 md:w-3/4" />
                </div>

                <div className="w-full md:w-1/2 mt-10 md:mt-0 md:ml-10">
                    <h1 className="text-3xl font-bold mb-4">{product.name} - {product.price}</h1>
                    <p className="text-gray-600 mb-6">
                        {product.description}
                    </p>

                    <div className="flex items-center mb-6">
                        <span className="mr-4">Quantity</span>
                        <div className="flex items-center border rounded-md p-1">
                            <button className="px-2">-</button>
                            <span className="px-4">1</span>
                            <button className="px-2">+</button>
                        </div>
                    </div>

                    <button className="bg-black text-white px-8 py-3 rounded-lg">
                        ADD TO CART
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductDetailPage;
