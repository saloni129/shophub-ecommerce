import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setCategory,
  setPriceRange,
  setMinRating,
  setSortBy,
  resetFilters,
  selectFilters,
} from '../../features/filters/filterSlice';
import { useCategories } from '../../hooks/useProducts';
import { Star, RotateCcw } from 'lucide-react';

export default function Filters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const { data: categories = [], isLoading } = useCategories();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        <button
          onClick={() => dispatch(resetFilters())}
          className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Categories</option>
          {!isLoading && categories.map((cat) => {
            const categoryStr = String(cat);
            return (
              <option key={categoryStr} value={categoryStr}>
                {categoryStr.charAt(0).toUpperCase() + categoryStr.slice(1)}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Price Range
        </label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) =>
                dispatch(
                  setPriceRange({
                    min: Number(e.target.value),
                    max: filters.maxPrice,
                  })
                )
              }
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) =>
                dispatch(
                  setPriceRange({
                    min: filters.minPrice,
                    max: Number(e.target.value),
                  })
                )
              }
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Minimum Rating
        </label>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => dispatch(setMinRating(rating))}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                filters.minRating === rating
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm">& up</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as any))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="none">None</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
    </div>
  );
}