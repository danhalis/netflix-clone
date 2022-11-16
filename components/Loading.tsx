import React from "react";
import ReactLoading from "react-loading";

function Loading() {
  return (
    <div
      className="
        flex items-center justify-center
        h-screen w-screen
      "
    >
      <ReactLoading className="h-50 w-50" type="spin" color="red" />
    </div>
  );
}

export default Loading;
