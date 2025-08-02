import { allGames, availableFilters, delay } from "@/utils/endpoint";

const ITEMS_PER_PAGE = 12;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");
  const pageParam = searchParams.get("page");
  let page = parseInt(pageParam ?? "1");

  let games = allGames;

  if (genre) {
    games = games.filter(
      (game) => game.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  if (page < 1 || isNaN(page)) page = 1;

  // Mock a delay to simulate a real API
  await delay(2000);

  const toIndex = page * ITEMS_PER_PAGE;
  games = games.slice(0, toIndex);
  const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE);

  return Response.json({ games, availableFilters, totalPages });
}
