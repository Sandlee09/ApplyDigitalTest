"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Game } from "@/services/api";
import {
  CartItem,
  getCartFromStorage,
  addToCart,
  removeFromCart,
  isInCart,
} from "@/utils/cart";
import Notification from "@/components/Notification";

interface CartContextType {
  cart: CartItem[];
  addItem: (game: Game) => void;
  removeItem: (gameId: string) => void;
  isItemInCart: (gameId: string) => boolean;
  notification: {
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  };
  showNotification: (message: string, type: "success" | "error") => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState({
    message: "",
    type: "success" as "success" | "error",
    isVisible: false,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = getCartFromStorage();
    setCart(savedCart);
  }, []);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type, isVisible: true });
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  const addItem = (game: Game) => {
    const updatedCart = addToCart(game);
    setCart(updatedCart);
    showNotification("Product added to cart", "success");
  };

  const removeItem = (gameId: string) => {
    const updatedCart = removeFromCart(gameId);
    setCart(updatedCart);
    showNotification("Item removed from cart", "success");
  };

  const isItemInCart = (gameId: string) => {
    return isInCart(gameId);
  };

  const value: CartContextType = {
    cart,
    addItem,
    removeItem,
    isItemInCart,
    notification,
    showNotification,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </CartContext.Provider>
  );
};
