import {
  getCartFromStorage,
  saveCartToStorage,
  addToCart,
  removeFromCart,
  isInCart,
  getCartItemCount,
} from "../cart";

const mockGame = {
  id: "1",
  genre: "Action",
  image: "/test-image.jpg",
  name: "Test Game",
  description: "A test game",
  price: 59.99,
  isNew: true,
};

describe("Cart Utilities", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("getCartFromStorage", () => {
    it("should return empty array when localStorage is empty", () => {
      const result = getCartFromStorage();
      expect(result).toEqual([]);
    });

    it("should return parsed cart data from localStorage", () => {
      const mockCart = [{ ...mockGame, quantity: 1 }];
      localStorage.setItem("game-cart", JSON.stringify(mockCart));

      const result = getCartFromStorage();
      expect(result).toEqual(mockCart);
    });

    it("should return empty array on JSON parse error", () => {
      localStorage.setItem("game-cart", "invalid-json");

      const result = getCartFromStorage();
      expect(result).toEqual([]);
    });
  });

  describe("saveCartToStorage", () => {
    it("should save cart data to localStorage", () => {
      const mockCart = [{ ...mockGame, quantity: 1 }];

      saveCartToStorage(mockCart);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "game-cart",
        JSON.stringify(mockCart)
      );
    });
  });

  describe("addToCart", () => {
    it("should add new item to empty cart", () => {
      const result = addToCart(mockGame);

      expect(result).toEqual([{ ...mockGame, quantity: 1 }]);
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it("should increase quantity for existing item", () => {
      const existingCart = [{ ...mockGame, quantity: 1 }];
      localStorage.setItem("game-cart", JSON.stringify(existingCart));

      const result = addToCart(mockGame);

      expect(result).toEqual([{ ...mockGame, quantity: 2 }]);
    });

    it("should add different item to existing cart", () => {
      const existingCart = [{ ...mockGame, quantity: 1 }];
      localStorage.setItem("game-cart", JSON.stringify(existingCart));

      const newGame = { ...mockGame, id: "2", name: "Test Game 2" };
      const result = addToCart(newGame);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ ...mockGame, quantity: 1 });
      expect(result[1]).toEqual({ ...newGame, quantity: 1 });
    });
  });

  describe("removeFromCart", () => {
    it("should remove item from cart", () => {
      const existingCart = [
        { ...mockGame, quantity: 1 },
        { ...mockGame, id: "2", name: "Test Game 2", quantity: 1 },
      ];
      localStorage.setItem("game-cart", JSON.stringify(existingCart));

      const result = removeFromCart("1");

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("2");
    });

    it("should return empty array when removing from empty cart", () => {
      const result = removeFromCart("1");
      expect(result).toEqual([]);
    });
  });

  describe("isInCart", () => {
    it("should return true when item is in cart", () => {
      const existingCart = [{ ...mockGame, quantity: 1 }];
      localStorage.setItem("game-cart", JSON.stringify(existingCart));

      const result = isInCart("1");
      expect(result).toBe(true);
    });

    it("should return false when item is not in cart", () => {
      const result = isInCart("1");
      expect(result).toBe(false);
    });
  });

  describe("getCartItemCount", () => {
    it("should return 0 for empty cart", () => {
      const result = getCartItemCount();
      expect(result).toBe(0);
    });

    it("should return total quantity of all items", () => {
      const existingCart = [
        { ...mockGame, quantity: 2 },
        { ...mockGame, id: "2", name: "Test Game 2", quantity: 3 },
      ];
      localStorage.setItem("game-cart", JSON.stringify(existingCart));

      const result = getCartItemCount();
      expect(result).toBe(5);
    });
  });
});
