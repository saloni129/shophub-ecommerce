import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Home } from 'lucide-react';

export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Package className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold">Order Details</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold font-mono">{orderId}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Order Date</span>
              <span className="font-semibold">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-semibold">Credit Card</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Estimated Delivery</span>
              <span className="font-semibold">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>We'll send you a confirmation email shortly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>You'll receive tracking information once your order ships</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Estimated delivery: 5-7 business days</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Continue Shopping
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 btn-secondary py-3"
          >
            Print Receipt
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Need help? Contact us at{' '}
            <a href="mailto:support@shophub.com" className="text-primary-600 hover:underline">
              support@shophub.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}