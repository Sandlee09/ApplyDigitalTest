"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { preserveScrollPosition } from "@/utils/scrollPreservation";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useLoading } from "@/contexts/LoadingContext";

interface SeeMoreButtonProps {
  currentPage: number;
  totalPages: number;
}

export default function SeeMoreButton({
  currentPage,
  totalPages,
}: SeeMoreButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams, isLoading]);

  const handleSeeMore = () => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams);
    const nextPage = currentPage + 1;
    params.set("page", nextPage.toString());
    const restoreScroll = preserveScrollPosition();
    router.replace(`/?${params.toString()}`, { scroll: false });
    restoreScroll();
  };

  console.log("currentPage", currentPage);
  console.log("totalPages", totalPages);

  if (currentPage >= totalPages) {
    return null;
  }

  return (
    <button
      onClick={() => handleSeeMore()}
      disabled={isLoading}
      className="flex w-fit px-6 py-4 rounded-lg font-bold bg-darkBackground hover:bg-gray-500 cursor-pointer text-white disabled:opacity-50 disabled:cursor-not-allowed items-center space-x-2"
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" />
          <span>Loading...</span>
        </>
      ) : (
        <span>SEE MORE</span>
      )}
    </button>
  );
}
