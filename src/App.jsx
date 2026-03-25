import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Landing page/Navbar/Navbar";
import Footer from "./components/Landing page/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts/AdminProducts";
import AdminCategories from "./pages/Admin/AdminCategories/AdminCategories";
import AdminPlaceholder from "./pages/Admin/AdminPlaceholder/AdminPlaceholder";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/:section" element={<AdminPlaceholder />} />
        <Route path="/logout" element={<AdminPlaceholder />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
