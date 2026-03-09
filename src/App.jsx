import Navbar from "./components/Landing page/Navbar/Navbar";
import Hero from "./components/Landing page/HeroSection/Hero";
import Categories from "./components/Landing page/Categories/Categories";
import ProductSection from "./components/Landing page/ProductSection/ProductSection";
import NewProducts from "./components/Landing page/NewProducts/NewProducts";
import PromoSection from "./components/Landing page/PromoSection/PromoSection";
import WatchBanner from "./components/Landing page/WatchBanner/WatchBanner";
import ServiceBar from "./components/Landing page/ServiceBar/ServiceBar";
import Footer from "./components/Landing page/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <ProductSection />
      <NewProducts />
      <PromoSection />
      <WatchBanner />
      <ServiceBar />
      <Footer />
    </>
  );
}

export default App;
