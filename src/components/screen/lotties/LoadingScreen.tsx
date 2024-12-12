import React from "react";
import Lottie from "react-lottie";
import loadingLottie from "@/assets/json/loading-screen.json";

export const LoadingScreen = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <div>hello</div>
      {/* <Lottie options={defaultOptions} width={"100vw"} height={"100vh"} /> */}
    </div>
  );
};
