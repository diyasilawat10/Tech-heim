import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Landing page/Navbar/Navbar";
import Hero from "./components/Landing page/HeroSection/Hero";
import Categories from "./components/Landing page/Categories/Categories";
import ProductSection from "./components/Landing page/ProductSection/ProductSection";
import NewProducts from "./components/Landing page/NewProducts/NewProducts";
import PromoSection from "./components/Landing page/PromoSection/PromoSection";
import BestSellers from "./components/Landing page/BestSellers/BestSellers";
import TopBrands from "./components/Landing page/TopBrands/TopBrands";
import WatchBanner from "./components/Landing page/WatchBanner/WatchBanner";
import BlogsSection from "./components/Landing page/BlogsSection/BlogsSection";
import ServiceBar from "./components/Landing page/ServiceBar/ServiceBar";
import Footer from "./components/Landing page/Footer/Footer";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";

const HomePage = () => (
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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
