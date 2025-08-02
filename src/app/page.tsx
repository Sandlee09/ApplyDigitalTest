import { fetchGames } from "@/services/api";

export default async function Home() {
  const { games, availableFilters, totalPages, currentPage } =
    await fetchGames();

  return (
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto"></div>
    </main>
  );
}
