import { CartItem } from "@/utils/cart";

const OrderSummary = ({
  cart,
  totalItems,
  totalPrice,
}: {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
}) => {
  return (
    <div className="lg:col-span-1 flex flex-col gap-10 max-w-[522px]">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
        <p className="text-gray-600 mb-4">{totalItems} items</p>

        <div className="space-y-2 mb-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.name}</span>
              <span className="text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold text-gray-900">Order Total</span>
          <span className="text-xl font-bold text-gray-900">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <button className="w-full bg-lightGrayText text-white py-3 px-4 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-sm">
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
