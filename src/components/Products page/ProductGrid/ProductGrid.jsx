import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import './ProductGrid.css';
import ProductCard from '../ProductCard/ProductCard';
import Pagination from '../Pagination/Pagination';

const PromoBanners = lazy(() => import('../PromoBanners/PromoBanners'));

const PRODUCTS_PER_PAGE = 15;
const PROMO_AFTER_ROW = 2; // 0-indexed → after row 3 = after 9 cards

function ProductGrid({ sortOrder = 'featured' }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categories = ['smartphones', 'laptops', 'tablets', 'mobile-accessories'];
        const results = await Promise.all(
          categories.map(cat =>
            fetch(`https://dummyjson.com/products/category/${cat}`).then(r => r.json())
          )
        );
        if (cancelled) return;
        const all = results.flatMap(d => d.products).sort(() => Math.random() - 0.5);
        setProducts(
          all.map(p => ({
            id: p.id,
            title: p.title,
            price: p.price,
            oldPrice: Math.round(p.price / (1 - p.discountPercentage / 100)),
            discount: `-${Math.round(p.discountPercentage)}%`,
            rating: p.rating,
            image: p.thumbnail,
            colors: ['#000000', '#FFFFFF', '#8B8B8B'],
          }))
        );
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => { setCurrentPage(1); }, [sortOrder]);

  const sortedProducts = useMemo(() => {
    const result = [...products];
    if (sortOrder === 'price-asc')    result.sort((a, b) => a.price - b.price);
    if (sortOrder === 'price-desc')   result.sort((a, b) => b.price - a.price);
    if (sortOrder === 'new-arrivals') result.sort((a, b) => b.id - a.id);
    if (sortOrder === 'popularity')   result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, sortOrder]);

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="loading-grid">Loading products...</div>;
  }

  const rows = [];
  for (let i = 0; i < currentProducts.length; i += 3) {
    rows.push(currentProducts.slice(i, i + 3));
  }

  // Only show promo banner if there are rows AFTER it (i.e. more than 3 rows total)
  const showPromoBanner = rows.length > PROMO_AFTER_ROW + 1;

  return (
    <div className="product-grid-wrapper">
      <div className="product-grid-container">
        {rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="product-row">
              {row.map((p, i) => (
                <ProductCard key={p.id} {...p} isMiddle={i === 1} />
              ))}
            </div>
            {showPromoBanner && rowIndex === PROMO_AFTER_ROW && (
              <Suspense fallback={<div className="loading-grid">Loading...</div>}>
                <PromoBanners />
              </Suspense>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="pagination-wrapper">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ProductGrid;
