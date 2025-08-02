export interface Game {
  id: string;
  genre: string;
  image: string;
  name: string;
  description: string;
  price: number;
  isNew: boolean;
}

export interface GamesResponse {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
}

export async function fetchGames(
  genre?: string,
  page: number = 1
): Promise<GamesResponse> {
  const params = new URLSearchParams();

  if (genre) {
    params.append("genre", genre);
  }

  if (page > 1) {
    params.append("page", page.toString());
  }

  // Use absolute URL for server-side rendering
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const url = `${baseUrl}/api/games${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
}
