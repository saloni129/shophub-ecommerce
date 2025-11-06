import { useState, useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectFilters } from '../features/filters/filterSlice';
import ProductCard from '../components/product/ProductCard';
import Filters from '../components/product/Filters';
import { Loader2, Search } from 'lucide-react';
import { useProducts, useProductsByCategory } from '../hooks/useProducts';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const skip = (currentPage - 1) * productsPerPage;

  const filters = useAppSelector(selectFilters);

  const shouldFetchByCategory = filters.category !== 'all';
  
  const allProductsQuery = useProducts(productsPerPage, skip);
  const categoryProductsQuery = useProductsByCategory(filters.category);

  const { data, isLoading, error } = shouldFetchByCategory 
    ? categoryProductsQuery 
    : allProductsQuery;

  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];

    let filtered = [...data.products];

    if (filters.searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    if (filters.minRating > 0) {
      filtered = filtered.filter(
        (product) => product.rating >= filters.minRating
      );
    }

    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [data?.products, filters]);

  const totalPages = Math.ceil((data?.total || 0) / productsPerPage);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-semibold">
            Error loading products. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 mb-8 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Amazing Products
        </h1>
        <p className="text-xl text-primary-100">
          Shop from our curated collection of {data?.total || 0}+ products
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <Filters />
          </div>
        </aside>

        <div className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {data?.total || 0} products
            </p>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
          )}

          {!isLoading && filteredProducts.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-primary-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <Search className="mx-auto mb-4 text-gray-400" size={64} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}