import NavBar from './NavBar.jsx'
import BannerAds from "./BannerAds.jsx";
import Intro from "./Intro.jsx";
import Product from "./Product.jsx";

const HomePage = () => {
  return (
    <div className='overflow-scroll h-screen scrollbar-hide flex flex-col'>
        <NavBar />
        <BannerAds />
        <Intro />
        <Product />
    </div>
  );
}
export default HomePage