import { Game } from "@/services/api";

export interface CartItem extends Game {
  quantity: number;
}

const CART_STORAGE_KEY = "game-cart";

export const getCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

export const saveCartToStorage = (cart: CartItem[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const addToCart = (game: Game): CartItem[] => {
  const currentCart = getCartFromStorage();
  const existingItemIndex = currentCart.findIndex(
    (item) => item.id === game.id
  );

  if (existingItemIndex >= 0) {
    // Item already exists, increase quantity
    currentCart[existingItemIndex].quantity += 1;
  } else {
    // Add new item
    currentCart.push({ ...game, quantity: 1 });
  }

  saveCartToStorage(currentCart);
  return currentCart;
};

export const removeFromCart = (gameId: string): CartItem[] => {
  const currentCart = getCartFromStorage();
  const updatedCart = currentCart.filter((item) => item.id !== gameId);

  saveCartToStorage(updatedCart);
  return updatedCart;
};

export const isInCart = (gameId: string): boolean => {
  const currentCart = getCartFromStorage();
  return currentCart.some((item) => item.id === gameId);
};

export const getCartItemCount = (): number => {
  const currentCart = getCartFromStorage();
  return currentCart.reduce((total, item) => total + item.quantity, 0);
};
