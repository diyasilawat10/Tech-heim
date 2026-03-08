import Navbar from "./components/Landing page/Navbar/Navbar";
import Hero from "./components/Landing page/HeroSection/Hero";
import Categories from "./components/Landing page/Categories/Categories";
import ProductSection from "./components/Landing page/ProductSection/ProductSection";
import PromoSection from "./components/Landing page/PromoSection/PromoSection";
import TopBrands from "./components/Landing page/TopBrands/TopBrands";
import Footer from "./components/Landing page/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <ProductSection />
      <PromoSection />
      <TopBrands />
      <Footer />
    </>
  );
}

export default App;
