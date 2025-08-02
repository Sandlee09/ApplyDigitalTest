"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface CatalogHeaderProps {
  availableFilters: string[];
  currentGenre?: string;
}

export default function CatalogHeader({
  availableFilters,
  currentGenre,
}: CatalogHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [searchParams, isLoading]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGenreChange = (genre: string) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams);

    if (genre === "All") {
      params.delete("genre");
    } else {
      params.set("genre", genre);
    }

    params.delete("page");

    router.push(`/?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4">
            <LoadingSpinner size="lg" />
            <p className="text-gray-700 font-medium">Loading...</p>
          </div>
        </div>
      )}
      <div className="mb-8 flex flex-col">
        <div className="flex justify-between items-center mb-4 flex-col py-8">
          <div className="flex w-full px-20 py-8">
            <h1 className="text-4xl font-bold text-gray-800">Top Sellers</h1>
          </div>

          <div
            className="relative w-full flex justify-end px-20"
            ref={dropdownRef}
          >
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl text-gray-800">Genre</span>
              <div className="w-[2px] h-4 bg-gray-300"></div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isLoading}
                className="flex items-center space-x-1 text-gray-500 text-xl hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{currentGenre || "All"}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => handleGenreChange("All")}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      !currentGenre
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    All
                  </button>
                  {availableFilters.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreChange(genre)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        currentGenre === genre
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-px bg-gray-300"></div>
      </div>
    </>
  );
}
