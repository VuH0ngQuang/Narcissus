import NavBar from './NavBar.jsx'
import BannerAds from "./BannerAds.jsx";
import Intro from "./Intro.jsx";
import Product from "./Product.jsx";

const HomePage = () => {
  return (
    <div className='overflow-scroll h-screen scrollbar-hide flex flex-col'>
        <NavBar />
        <div className="flex flex-col min-h-screen">  
            <BannerAds />
            <Intro />
        </div>
        <Product />
    </div>
  );
}
export default HomePage