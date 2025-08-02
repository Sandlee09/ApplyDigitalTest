import { fetchGames } from "../api";

// Mock fetch globally
global.fetch = jest.fn();

describe("API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
  });

  it("fetches games without filters", async () => {
    const mockResponse = {
      games: [
        {
          id: "1",
          genre: "Action",
          image: "/test.jpg",
          name: "Test Game",
          description: "Test description",
          price: 59.99,
          isNew: true,
        },
      ],
      availableFilters: ["Action", "RPG"],
      totalPages: 1,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchGames();

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/games");
    expect(result).toEqual(mockResponse);
  });

  it("fetches games with genre filter", async () => {
    const mockResponse = {
      games: [
        {
          id: "1",
          genre: "Action",
          image: "/test.jpg",
          name: "Test Game",
          description: "Test description",
          price: 59.99,
          isNew: true,
        },
      ],
      availableFilters: ["Action", "RPG"],
      totalPages: 1,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchGames("Action");

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/games?genre=Action"
    );
    expect(result).toEqual(mockResponse);
  });

  it("fetches games with page parameter", async () => {
    const mockResponse = {
      games: [],
      availableFilters: ["Action", "RPG"],
      totalPages: 3,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchGames(undefined, 2);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/games?page=2"
    );
    expect(result).toEqual(mockResponse);
  });

  it("fetches games with both genre and page parameters", async () => {
    const mockResponse = {
      games: [],
      availableFilters: ["Action", "RPG"],
      totalPages: 2,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchGames("Action", 2);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/games?genre=Action&page=2"
    );
    expect(result).toEqual(mockResponse);
  });

  it("throws error when fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchGames()).rejects.toThrow("Failed to fetch games");
  });

  it("throws error when network request fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchGames()).rejects.toThrow("Network error");
  });

  it("uses absolute URL when NEXT_PUBLIC_API_URL is set", async () => {
    const originalEnv = process.env.NEXT_PUBLIC_API_URL;
    process.env.NEXT_PUBLIC_API_URL = "https://api.example.com";

    const mockResponse = {
      games: [],
      availableFilters: ["Action"],
      totalPages: 1,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await fetchGames();

    expect(fetch).toHaveBeenCalledWith("https://api.example.com/api/games");

    process.env.NEXT_PUBLIC_API_URL = originalEnv;
  });
});
