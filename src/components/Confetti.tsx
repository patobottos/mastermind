"use client";

import React from "react";
import Lottie from 'lottie-react';
import confetti from "@/app/assets/confetti.json";

function Confetti() {
  return (
    <Lottie
      animationData={confetti}
      loop={true}
      autoplay={true}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
    />
  );
}

export default Confetti;
