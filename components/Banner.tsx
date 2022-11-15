import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { FaPlay } from 'react-icons/fa';
import { InformationCircleIcon } from '@heroicons/react/solid';

import { IMAGE_BASE_URL } from '../constants/tmdbApi';
import { Movie } from '../typings';

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie|null>(null);
  useEffect(() => {
    setMovie(netflixOriginals[
      Math.floor(Math.random() * netflixOriginals.length)
    ]);
  });

  return (
    <div className="
      flex flex-col space-y-2 py-16
      md:space-y-4
      lg:h-[65vh] lg:justify-end lg:pb-12
    ">
			<div className="
        absolute top-0 left-0
        -z-10
        h-[95vh] w-screen
      ">
				<Image
          src={`${IMAGE_BASE_URL}/${movie?.backdrop_path || movie?.poster_path}`}
          alt=""
          style={{objectFit: "cover"}}
          fill
        />
			</div>

      {/* Movie Title */}
      <h1 className="
        text-2xl
        md:text-4xl
        lg:text-7xl
      ">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      {/* Overview */}
      <p className="
        max-w-xs
        text-xs text-shadow-md
        md:max-w-lg md:text-lg
        lg:max-w-2xl lg:text-2xl
      ">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="banner-btn text-black bg-white">
          <FaPlay className="
            h-4 w-4 text-black
            md:h-7 md:w-7
          "/>
          Play
        </button>
        <button className="banner-btn bg-[gray]/70">
          More Info
          <InformationCircleIcon className="
            h-5 w-5
            md:h-8 md:w-8
          "/>
        </button>
      </div>
    </div>
  );
}

export default Banner;