"use client";

import React, { FC } from "react";
import Lottie from "lottie-react";
import confetti from "@/app/assets/confetti.json";

interface ConfettiProps {
  loop?: boolean;
  autoplay?: boolean;
}

const Confetti: FC<ConfettiProps> = ({ loop = true, autoplay = true }) => {
  return (
    <Lottie
      animationData={confetti}
      loop={loop}
      autoplay={autoplay}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
    />
  );
};

export default Confetti;