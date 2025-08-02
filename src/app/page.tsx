import GameCard from "@/components/GameCard";
import CatalogHeader from "@/components/CatalogHeader";
import SeeMoreButton from "@/components/SeeMoreButton";
import { fetchGames } from "@/services/api";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: PageProps) {
  const genre =
    typeof searchParams.genre === "string" ? searchParams.genre : undefined;
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;

  const { games, availableFilters, totalPages } = await fetchGames(genre, page);

  return (
    <main className="">
      <CatalogHeader availableFilters={availableFilters} currentGenre={genre} />
      <div className="max-w-7xl mx-auto flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        <div className="flex justify-start mt-8">
          <SeeMoreButton currentPage={page} totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
