import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '../services/api';

/**
 * Hook to fetch all products with pagination
 * @param limit - Number of products per page (default: 20)
 * @param skip - Number of products to skip (default: 0)
 */
export const useProducts = (limit = 20, skip = 0) => {
  return useQuery({
    queryKey: ['products', limit, skip],
    queryFn: () => productsAPI.getAllProducts(limit, skip),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

/**
 * Hook to fetch a single product by ID
 * @param id - Product ID
 */
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsAPI.getProduct(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook to search products by query string
 * @param query - Search query
 */
export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => productsAPI.searchProducts(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 2,
  });
};

/**
 * Hook to fetch all available categories
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const data = await productsAPI.getCategories();
      if (Array.isArray(data)) {
        return data.map(cat => {
          if (typeof cat === 'string') return cat;
          if (typeof cat === 'object' && cat !== null) {
            const categoryObj = cat as any;
            return categoryObj.name || categoryObj.slug || String(cat);
          }
          return String(cat);
        });
      }
      return [];
    },
    staleTime: 1000 * 60 * 60,
  });
};

/**
 * Hook to fetch products by category
 * @param category - Category name
 */
export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productsAPI.getProductsByCategory(category),
    enabled: category !== 'all' && !!category,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook to fetch products with custom filters
 * Combines search, category, and pagination
 * @param options - Filter options
 */
export const useFilteredProducts = (options: {
  searchQuery?: string;
  category?: string;
  limit?: number;
  skip?: number;
}) => {
  const { searchQuery, category, limit = 20, skip = 0 } = options;

  if (searchQuery && searchQuery.length > 0) {
    return useSearchProducts(searchQuery);
  }

  if (category && category !== 'all') {
    return useProductsByCategory(category);
  }

  return useProducts(limit, skip);
};