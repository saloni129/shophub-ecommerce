import { Outlet } from 'react-router-dom';
import Header from './Header';
import CartDrawer from '../cart/CartDrawer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <CartDrawer />
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} ShopHub. Built with React + Redux Toolkit + TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}