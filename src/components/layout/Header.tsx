import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleCart, selectCartItemsCount } from '../../features/cart/cartSlice';
import { setSearchQuery, selectFilters } from '../../features/filters/filterSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartItemsCount);
  const filters = useAppSelector(selectFilters);

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <img
              src="/shophub-logo.svg"
              alt="ShopHub Logo"
              className="w-10 h-10 transition-transform group-hover:scale-110"
            />

            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                ShopHub
              </span>
              <span className="text-xs text-gray-500 -mt-1">Shop Smart, Shop Easy</span>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Search size={24} />
            </button>
            
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}