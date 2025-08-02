import { Game } from "@/services/api";

export default function GameCard({ game }: { game: Game }) {
  return (
    <div
      key={game.id}
      className="bg-white max-w-[380px] h-full rounded-[16px] overflow-hidden border border-zinc-200 p-6"
    >
      <div className="relative">
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-48 object-cover rounded-t-[16px] border border-zinc-100"
        />
        {game.isNew && (
          <div className="absolute top-2 left-2 bg-white text-grayTitle border border-zinc-200 px-2 py-1 rounded text-sm">
            New
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col h-52 gap-4">
        <h3 className="text-lg font-semibold text-lightGrayText mb-2">
          {game.genre}
        </h3>
        <div className="flex justify-between items-center gap-12 mb-4">
          <span className="text-lg font-bold text-grayTitle">{game.name}</span>
          <span className="text-lg font-bold text-grayTitle">
            ${game.price}
          </span>
        </div>
        <button className="text-grayTitle px-4 py-2 rounded-md border border-black w-full mt-auto font-bold shadow-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
