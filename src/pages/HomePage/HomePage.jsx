import React from 'react';
import Hero from '../../components/Landing page/HeroSection/Hero';
import Categories from '../../components/Landing page/Categories/Categories';
import ProductSection from '../../components/Landing page/ProductSection/ProductSection';
import NewProducts from '../../components/Landing page/NewProducts/NewProducts';
import PromoSection from '../../components/Landing page/PromoSection/PromoSection';
import BestSellers from '../../components/Landing page/BestSellers/BestSellers';
import TopBrands from '../../components/Landing page/TopBrands/TopBrands';
import WatchBanner from '../../components/Landing page/WatchBanner/WatchBanner';
import BlogsSection from '../../components/Landing page/BlogsSection/BlogsSection';
import ServiceBar from '../../components/Landing page/ServiceBar/ServiceBar';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Categories />
      <ProductSection />
      <NewProducts />
      <PromoSection />
      <BestSellers />
      <TopBrands />
      <WatchBanner />
      <BlogsSection />
      <ServiceBar />
    </>
  );
};

export default HomePage;
