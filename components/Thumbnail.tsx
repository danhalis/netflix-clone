import Image from "next/image";
import React from "react";
import { CONFIG_SIZE_IMAGE_BASE_URL } from "../constants/tmdbApi";
import { Movie } from "../typings";

interface Props {
  thumbnailRef?: React.RefObject<HTMLDivElement>;
  movie: Movie;
}

function Thumbnail({ thumbnailRef, movie }: Props) {
  return (
    <div
      ref={thumbnailRef}
      className="
        relative
        h-28 min-w-[180px]
        cursor-pointer
        transition duration-200 ease-out
        md:h-36 md:min-w-[260px] md:hover:scale-105
      "
    >
      <Image
        src={`${CONFIG_SIZE_IMAGE_BASE_URL}${
          movie.backdrop_path || movie.poster_path
        }`}
        alt=""
        className="rounded-sm object-cover md:rounded"
        fill
        sizes="auto"
      />
    </div>
  );
}

export default Thumbnail;
