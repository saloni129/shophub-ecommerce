import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useAppDispatch } from '../store/hooks';
import { addToCart, openCart } from '../features/cart/cartSlice';
import { ShoppingCart, Star, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: product, isLoading, error } = useProduct(Number(id));
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      dispatch(openCart());
      toast.success(`${product.title} added to cart!`);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-primary-600" size={48} />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-semibold">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={product.images[selectedImage] || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-primary-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {product.category}
            </span>
            {product.brand && <span>• {product.brand}</span>}
          </div>

          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="fill-yellow-400 text-yellow-400" size={20} />
              <span className="text-lg font-semibold">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-500">({product.stock} in stock)</span>
          </div>

          <div className="flex items-center gap-4">
            {product.discountPercentage > 0 ? (
              <>
                <span className="text-4xl font-bold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-2xl text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  -{Math.round(product.discountPercentage)}% OFF
                </span>
              </>
            ) : (
              <span className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="border-t border-b py-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center gap-2">
            {product.stock > 10 ? (
              <span className="text-green-600 font-semibold">✓ In Stock</span>
            ) : product.stock > 0 ? (
              <span className="text-orange-600 font-semibold">
                ⚠ Only {product.stock} left!
              </span>
            ) : (
              <span className="text-red-600 font-semibold">✗ Out of Stock</span>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 btn-primary py-4 text-lg font-semibold flex items-center justify-center gap-2"
            >
              <ShoppingCart size={24} />
              Add to Cart
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">SKU:</span>
              <span className="font-semibold">{product.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-semibold">{product.category}</span>
            </div>
            {product.brand && (
              <div className="flex justify-between">
                <span className="text-gray-600">Brand:</span>
                <span className="font-semibold">{product.brand}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}