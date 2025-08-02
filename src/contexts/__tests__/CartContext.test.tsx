import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CartProvider, useCart } from "../CartContext";

const mockGame = {
  id: "1",
  genre: "Action",
  image: "/test-image.jpg",
  name: "Test Game",
  description: "A test game",
  price: 59.99,
  isNew: true,
};

// Test component to access cart context
const TestComponent = () => {
  const { cart, addItem, removeItem, isItemInCart } = useCart();

  return (
    <div>
      <div data-testid="cart-count">{cart.length}</div>
      <button onClick={() => addItem(mockGame)} data-testid="add-button">
        Add Item
      </button>
      <button onClick={() => removeItem("1")} data-testid="remove-button">
        Remove Item
      </button>
      <div data-testid="is-in-cart">{isItemInCart("1").toString()}</div>
    </div>
  );
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("provides initial empty cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
    expect(screen.getByTestId("is-in-cart")).toHaveTextContent("false");
  });

  it("loads cart from localStorage on mount", () => {
    const mockCart = [{ ...mockGame, quantity: 1 }];
    localStorage.setItem("game-cart", JSON.stringify(mockCart));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
    expect(screen.getByTestId("is-in-cart")).toHaveTextContent("true");
  });

  it("adds item to cart", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
      expect(screen.getByTestId("is-in-cart")).toHaveTextContent("true");
    });

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it("removes item from cart", async () => {
    // Add item first
    localStorage.setItem(
      "game-cart",
      JSON.stringify([{ ...mockGame, quantity: 1 }])
    );

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const removeButton = screen.getByTestId("remove-button");
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
      expect(screen.getByTestId("is-in-cart")).toHaveTextContent("false");
    });

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it("increases quantity when adding existing item", async () => {
    // Add item first
    localStorage.setItem(
      "game-cart",
      JSON.stringify([{ ...mockGame, quantity: 1 }])
    );

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    await waitFor(() => {
      const setItemMock = localStorage.setItem as jest.MockedFunction<
        typeof localStorage.setItem
      >;
      const cartData = JSON.parse(setItemMock.mock.calls[1][1]); // Use second call (after initial load)
      expect(cartData[0].quantity).toBe(2);
    });
  });

  it("shows notification when adding item", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Product added to cart")).toBeInTheDocument();
    });
  });

  it("shows notification when removing item", async () => {
    localStorage.setItem(
      "game-cart",
      JSON.stringify([{ ...mockGame, quantity: 1 }])
    );

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const removeButton = screen.getByTestId("remove-button");
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.getByText("Item removed from cart")).toBeInTheDocument();
    });
  });

  it("handles localStorage errors gracefully", () => {
    // Mock localStorage to throw error
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = jest.fn().mockImplementation(() => {
      throw new Error("Storage error");
    });

    expect(() => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      );
    }).not.toThrow();

    localStorage.setItem = originalSetItem;
  });
});
