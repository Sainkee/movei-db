import React, { useState, useEffect } from "react";

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolledDown = prevScrollPos < currentScrollPos;

      setIsHidden(isScrolledDown);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <header className="py-6 backdrop-blur-md bg-transparent text-white font-bold px-6">
        <nav className="flex justify-between items-center md:w-[80%] mx-auto">
          <div>Movie</div>
          <div className="hidden md:flex gap-5">
            <span>TV show</span>
            <span>Movie Show</span>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 p-4">
            <span className="block text-white mb-2">TV show</span>
            <span className="block text-white">Movie Show</span>
          </div>
        )}
      </header>
    </div>
  );
}
