import { Link } from "react-router-dom";
import product1 from '../../assets/product1.jpg';

const ProductLink = ({ to, children, img }) => {
    return (
        <Link to={to}>
            <div className='h-60 w-44 ml-10 mr-10 rounded-3xl'>
                <div className='bg-[#D9D9D9] rounded-t-3xl h-4/5'>
                    <img src={img} alt='product' className='w-full h-full object-cover rounded-t-3xl'/>
                </div>
                <div className='bg-[#ADADAD] h-1/5 rounded-b-3xl flex justify-center items-center'>
                    <h1 className='font-abeezee text-white'>{children}</h1>
                </div>
            </div>
        </Link>
    );
};

const Product = () => {
    return (
        <div className='w-full h-[600px] flex flex-col justify-center'>
            <div className='flex flex-row justify-center items-center mb-10'>
                <ProductLink to={'/product/1'} img={product1}>Product 1</ProductLink>
                <ProductLink to={'/product/2'} img={product1}>Product 2</ProductLink>
                <ProductLink to={'/product/3'} img={product1}>Product 3</ProductLink>
                <ProductLink to={'/product/4'} img={product1}>Product 4</ProductLink>
            </div>
            <div className='flex flex-row justify-center items-center mb-10'>
                <ProductLink to={'/product/5'} img={product1}>Product 5</ProductLink>
                <ProductLink to={'/product/6'} img={product1}>Product 6</ProductLink>
                <ProductLink to={'/product/7'} img={product1}>Product 7</ProductLink>
                <ProductLink to={'/product/8'} img={product1}>Product 8</ProductLink>
            </div>
        </div>
    );
};

export default Product;
