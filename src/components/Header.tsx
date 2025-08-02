import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="h-16 bg-lightBackground text-white flex items-center justify-between px-20">
      <div className="text-2xl font-semibold text-grayTitle font-area">
        GamerShop
      </div>
      <Link
        href="/cart"
        className="p-2 hover:bg-gray-300 text-grayTitle rounded"
      >
        <Image src="/cart.svg" alt="Cart" width={24} height={24} />
      </Link>
    </header>
  );
}
