import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameCard from "../GameCard";
import { CartProvider } from "@/contexts/CartContext";

const mockGame = {
  id: "1",
  genre: "Action",
  image: "/test-image.jpg",
  name: "Test Game",
  description: "A test game description",
  price: 59.99,
  isNew: true,
};

const renderWithCartProvider = (component: React.ReactElement) => {
  return render(<CartProvider>{component}</CartProvider>);
};

describe("GameCard", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders game information correctly", () => {
    renderWithCartProvider(<GameCard game={mockGame} />);

    expect(screen.getByText("Test Game")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("$59.99")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByAltText("Test Game")).toBeInTheDocument();
  });

  it('shows "Add to Cart" button when item is not in cart', () => {
    renderWithCartProvider(<GameCard game={mockGame} />);

    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it('shows "Remove" button when item is in cart', async () => {
    // Add item to cart first
    localStorage.setItem(
      "game-cart",
      JSON.stringify([{ ...mockGame, quantity: 1 }])
    );

    renderWithCartProvider(<GameCard game={mockGame} />);

    await waitFor(() => {
      expect(screen.getByText("Remove")).toBeInTheDocument();
    });
  });

  it('adds item to cart when "Add to Cart" is clicked', () => {
    renderWithCartProvider(<GameCard game={mockGame} />);

    const addButton = screen.getByText("Add to Cart");
    fireEvent.click(addButton);

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('removes item from cart when "Remove" is clicked', async () => {
    // Add item to cart first
    localStorage.setItem(
      "game-cart",
      JSON.stringify([{ ...mockGame, quantity: 1 }])
    );

    renderWithCartProvider(<GameCard game={mockGame} />);

    await waitFor(() => {
      const removeButton = screen.getByText("Remove");
      fireEvent.click(removeButton);
    });

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('applies correct styling for "Add to Cart" button', () => {
    renderWithCartProvider(<GameCard game={mockGame} />);

    const button = screen.getByText("Add to Cart");
    expect(button).toHaveClass("text-grayTitle", "border-black");
  });

  it('applies correct styling for "Remove" button', async () => {
    localStorage.setItem(
      "game-cart",
      JSON.stringify([{ ...mockGame, quantity: 1 }])
    );

    renderWithCartProvider(<GameCard game={mockGame} />);

    await waitFor(() => {
      const button = screen.getByText("Remove");
      expect(button).toHaveClass("text-red-600", "border-red-600");
    });
  });

  it('does not show "New" badge when game is not new', () => {
    const nonNewGame = { ...mockGame, isNew: false };
    renderWithCartProvider(<GameCard game={nonNewGame} />);

    expect(screen.queryByText("New")).not.toBeInTheDocument();
  });

  it("truncates long game names with tooltip", () => {
    const longNameGame = {
      ...mockGame,
      name: "This is a very long game name that should be truncated",
    };
    renderWithCartProvider(<GameCard game={longNameGame} />);

    const gameNameElement = screen.getByText(longNameGame.name);
    expect(gameNameElement).toHaveAttribute("title", longNameGame.name);
    expect(gameNameElement).toHaveClass("line-clamp-2", "cursor-help");
  });
});
