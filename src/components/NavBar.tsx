"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { getCartItemCount } from "@/utils/cart";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { cart } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCartCount(getCartItemCount());
  }, [cart]);
  return (
    <header className="h-16 bg-lightBackground text-white flex items-center justify-between px-4 lg:px-20">
      <div className="text-2xl font-semibold text-grayTitle font-area">
        GamerShop
      </div>
      <Link
        href="/cart"
        className="p-2 hover:bg-gray-300 text-grayTitle rounded relative"
      >
        <Image src="/cart.svg" alt="Cart" width={24} height={24} />
        {isClient && cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {cartCount}
          </span>
        )}
      </Link>
    </header>
  );
}
