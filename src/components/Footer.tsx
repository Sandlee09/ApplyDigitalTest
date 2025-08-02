import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white h-[172px] flex items-center justify-center">
      <Link href="/">
        <Image
          src="/apply-digital-logo.svg"
          alt="GamerShop Logo"
          width={170}
          height={45}
        />
      </Link>
    </footer>
  );
}
