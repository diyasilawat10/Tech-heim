import Navbar from "./components/Landing page/Navbar/Navbar";
import Hero from "./components/Landing page/HeroSection/Hero";
import Categories from "./components/Landing page/Categories/Categories";
import ProductSection from "./components/Landing page/ProductSection/ProductSection";
import PromoSection from "./components/Landing page/PromoSection/PromoSection";
import BlogsSection from "./components/Landing page/BlogsSection/BlogsSection";
import Footer from "./components/Landing page/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <ProductSection />
      <PromoSection />
      <BlogsSection />
      <Footer />
    </>
  );
}

export default App;
