import React, { useLayoutEffect, useRef, useState } from "react";

import Thumbnail from "./Thumbnail";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import { Movie } from "../typings";

interface Props {
  title: string;
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const leftButton = useRef<SVGSVGElement>(null);
  const rightButton = useRef<SVGSVGElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const onRowScroll = () => {
    if (!rowRef.current || !thumbnailRef.current) return;

    const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
    if (scrollLeft == 0) {
      // Hide left button
      leftButton.current!.classList.add("hidden");
      return;
    }
    rightButton.current!.classList.remove("hidden");

    if (
      scrollWidth - (scrollLeft + clientWidth) <=
      thumbnailRef.current.offsetWidth * 0.1
    ) {
      // Hide right button
      rightButton.current!.classList.add("hidden");
      return;
    }
    leftButton.current!.classList.remove("hidden");
  };

  const onArrowClick = (left: boolean) => {
    if (!rowRef.current) return;

    const { scrollLeft, clientWidth } = rowRef.current;

    if (left) {
      rowRef.current.scrollTo({
        left: scrollLeft - clientWidth,
        behavior: "smooth",
      });
    } else {
      rowRef.current.scrollTo({
        left: scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="
        h-40 space-y-0.5
        md:space-y-2
      "
    >
      <h2
        className="
          w-56
          text-sm font-semibold text-[#e5e5e5]
          cursor-pointer
          transition duration-200 hover:text-white
          md:text-2xl
        "
      >
        {title}
      </h2>
      <div className="relative group md:-ml-2">
        <ChevronLeftIcon
          ref={leftButton}
          className="
            absolute top-0 bottom-0 left-2
            z-40
            h-9 w-9
            m-auto
            cursor-pointer
            opacity-0
            transition hover:scale-125 group-hover:opacity-100
            hidden
          "
          onClick={() => onArrowClick(true)}
        />

        <div
          ref={rowRef}
          className="
            flex items-center
            space-x-0.5
            overflow-x-scroll
            scrollbar-hide
            md:space-x-2.5
            md:p-2
          "
          onScroll={onRowScroll}
        >
          {movies.map((movie) => {
            if (!thumbnailRef.current)
              return <Thumbnail thumbnailRef={thumbnailRef} movie={movie} />;
            return <Thumbnail movie={movie} />;
          })}
        </div>

        <ChevronRightIcon
          ref={rightButton}
          className="
            absolute top-0 bottom-0 right-2
            z-40
            h-9 w-9
            m-auto
            cursor-pointer
            opacity-0
            transition hover:scale-125 group-hover:opacity-100
          "
          onClick={() => onArrowClick(false)}
        />
      </div>
    </div>
  );
}

export default Row;
