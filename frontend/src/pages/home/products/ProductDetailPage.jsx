import { useParams } from "react-router-dom";
import NavBar from '../NavBar.jsx';
import product1 from '../../../assets/product1.jpg';
import product2 from '../../../assets/product1.jpg';
import product3 from '../../../assets/product1.jpg';
import product4 from '../../../assets/product1.jpg';
import product5 from '../../../assets/product1.jpg';
import product6 from '../../../assets/product1.jpg';
import product7 from '../../../assets/product1.jpg';
import product8 from '../../../assets/product1.jpg';
import combine from '../../../assets/combine.png';

const products = [
    { id: 1, name: "Rosy Delight", price: "$100", description: "A beautiful bouquet of roses.", img: product1, sold: 150 },
    { id: 2, name: "Sunshine Bundle", price: "$80", description: "Bright sunflowers to make your day.", img: product2, sold: 200 },
    { id: 3, name: "Tulip Treasure", price: "$70", description: "Colorful tulips for spring vibes.", img: product3, sold: 90 },
    { id: 4, name: "Lily Love", price: "$120", description: "Elegant white lilies.", img: product4, sold: 75 },
    { id: 5, name: "Orchid Oasis", price: "$150", description: "Exquisite orchids for a special touch.", img: product5, sold: 60 },
    { id: 6, name: "Peony Paradise", price: "$130", description: "Delicate peonies for a luxurious feel.", img: product6, sold: 110 },
    { id: 7, name: "Daisy Delight", price: "$50", description: "Charming daisies to lift spirits.", img: product7, sold: 300 },
    { id: 8, name: "Lavender Bliss", price: "$90", description: "Soothing lavender bouquet.", img: product8, sold: 220 },
];

const ProductDetailPage = () => {
    const { id } = useParams();
    const productId = parseInt(id);

    const product = products.find(p => p.id === productId);

    if (!product) {
        return <h1>Product not found</h1>;
    }

    return (
        <>
            <NavBar />
            <div className="pt-12 flex flex-col md:flex-row justify-center items-center md:items-start m-10">
                {/* Left column for product image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={product.img}
                        alt={product.name}
                        className="rounded-lg w-full h-auto max-h-[80vh] object-cover"
                        style={{ maxWidth: '90vw' }}
                    />
                </div>

                <div className="w-full md:w-1/2 mt-10 md:mt-0 md:ml-10">
                    <h1 className="text-3xl font-bold mb-4">{product.name} - {product.price}</h1>
                    <p className="text-gray-600 mb-6">
                        {product.description}
                    </p>
                    <p className="text-gray-500 mb-6">
                        <strong>Product Sold:</strong> {product.sold}
                    </p>

                    <div className="flex items-center mb-6">
                        <span className="mr-4">Quantity</span>
                        <div className="flex items-center border rounded-md p-1">
                            <button className="px-2">-</button>
                            <span className="px-4">1</span>
                            <button className="px-2">+</button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Excellent Combination with:</h2>
                        <img
                            src={combine}
                            alt="Excellent Combination"
                            className="w-full h-auto rounded-lg"
                            style={{maxWidth: '100%', maxHeight: '500px', objectFit: 'cover'}}
                        />

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
