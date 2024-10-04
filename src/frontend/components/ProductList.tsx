import React from 'react'
import type { Product } from '../types'
import '../public/ProductList.css'
import ProductCard from './ProductCard'; 


// TODO
// Implement the ProductListProps interface.
interface ProductListProps {
    products  : Product[],
    currentPage: number,
    totalPages: number,
    setCurrentPage: (page: number) => void,
}

const ProductList: React.FC<ProductListProps> = ({
    products,
    currentPage,
    totalPages,
    setCurrentPage,
}) => {
    const renderPaginationLinks = () => {
        const links = []
        for (let i = 1; i <= totalPages; i++) {
            links.push(
              <a
                key={i}
                className={i === currentPage ? 'active' : ''}
                onClick={() => setCurrentPage(i)}
              >
                {i}
              </a>
            );
          }
        return links
    }

    return (
        <div className="product-list">
            <h2>Products</h2>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                ))}
                </div>
            )}
            <div className="pagination">{renderPaginationLinks()}</div>
        </div>
    )
}

export default ProductList
