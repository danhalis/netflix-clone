import { useEffect, useState } from "react";

import Link from "next/link";

import { SearchIcon, BellIcon } from "@heroicons/react/solid";

interface Props {
  logOut: () => Promise<boolean>;
}

function Navbar({ logOut }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Return clean up function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div
        className="
				flex items-center space-x-2
				md:space-x-10
			"
      >
        <img
          src="http://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul
          className="
					hidden space-x-4
					md:flex
				"
        >
          <li className="nav-link">Home</li>
          <li className="nav-link">TV Shows</li>
          <li className="nav-link">Movies</li>
          <li className="nav-link">New & Popular</li>
          <li className="nav-link">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        {/* <Link href="/account"> */}
        <img
          src="https://rb.gy/g1pwyx"
          className="cursor-pointer rounded"
          onClick={logOut}
        />
        {/* </Link> */}
      </div>
    </header>
  );
}

export default Navbar;
