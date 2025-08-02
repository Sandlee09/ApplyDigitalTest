import GameCard from "@/components/GameCard";
import { fetchGames } from "@/services/api";

export default async function Home() {
  const { games, availableFilters, totalPages, currentPage } =
    await fetchGames();

  return (
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-12">
          {games.map((game) => (
            <GameCard game={game} />
          ))}
        </div>
      </div>
    </main>
  );
}
