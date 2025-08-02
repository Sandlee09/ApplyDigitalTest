"use client";

import { Game } from "@/services/api";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";

export default function GameCard({ game }: { game: Game }) {
  const { addItem, removeItem, isItemInCart, cart } = useCart();
  const [itemInCart, setItemInCart] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setItemInCart(isItemInCart(game.id));
  }, [game.id, isItemInCart]);

  useEffect(() => {
    if (isClient) {
      setItemInCart(isItemInCart(game.id));
    }
  }, [cart, game.id, isItemInCart, isClient]);
  return (
    <div
      key={game.id}
      className="bg-white max-w-[380px] h-full rounded-[16px] overflow-hidden border border-zinc-200 p-6"
    >
      <div className="relative">
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-48 object-fill rounded-t-[16px] border border-zinc-100"
        />
        {game.isNew && (
          <div className="absolute top-2 left-2 bg-white text-grayTitle border border-zinc-200 px-2 py-1 rounded text-sm">
            New
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col h-52 gap-4">
        <h3 className="text-lg font-semibold text-lightGrayText mb-2">
          {game.genre}
        </h3>
        <div className="flex justify-between items-center gap-12 mb-4">
          <span
            className="text-lg font-bold text-grayTitle line-clamp-2 cursor-help"
            title={game.name}
          >
            {game.name}
          </span>
          <span className="text-lg font-bold text-grayTitle">
            ${game.price}
          </span>
        </div>
        <button
          onClick={() => (itemInCart ? removeItem(game.id) : addItem(game))}
          className={`px-4 py-2 rounded-md border w-full mt-auto font-bold shadow-md transition-colors ${
            itemInCart
              ? "text-red-600 border-red-600 hover:bg-red-50"
              : "text-grayTitle border-black hover:bg-gray-50"
          }`}
        >
          {isClient && itemInCart ? "Remove" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
