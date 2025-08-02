import { CartItem as CartItemType } from "@/utils/cart";
import Image from "next/image";

const CartItem = ({
  item,
  removeItem,
}: {
  item: CartItemType;
  removeItem: (id: string) => void;
}) => {
  return (
    <div
      key={item.id}
      className="relative flex items-center pl-6 py-6 border-b border-gray-300 last:border-b-0 gap-2"
    >
      <div className="flex-shrink-0 mr-4">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="w-64 h-40 object-cover"
        />
      </div>
      <div className="flex flex-col w-full px-6">
        <button
          onClick={() => removeItem(item.id)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label="Remove item"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
            {item.genre}
          </p>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>

        <div className="text-right mt-10">
          <p className="text-lg font-bold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          {item.quantity > 1 && (
            <p className="text-sm text-gray-500">
              ${item.price.toFixed(2)} each
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
