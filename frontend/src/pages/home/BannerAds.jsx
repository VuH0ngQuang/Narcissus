import React, { useState, useEffect } from 'react';
import Banner1 from '../../assets/banner1.jpg';
import Banner2 from '../../assets/banner2.jpg';
import Banner3 from '../../assets/banner3.jpg';

const BannerAds = () => {
    const ads = [
        { id: 1, image: Banner1 },
        { id: 2, image: Banner2 },
        { id: 3, image: Banner3 },
    ];

    const [currentAdIndex, setCurrentAdIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAdIndex((prevIndex) =>
                prevIndex === ads.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change every 1000ms (1 second)

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [ads.length]);

    return (
        <div className=''>
            <div className='h-12'></div>
            <div className="w-full aspect-[32/4.5] flex items-center justify-center overflow-hidden">
                <img
                    src={ads[currentAdIndex].image}
                    alt={`Banner Ad ${currentAdIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500"
                />
            </div>
        </div>
    );
};

export default BannerAds;
