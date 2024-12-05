"use client";

import React from "react";
//import dynamic from "next/dynamic";
import Lottie from 'lottie-react';
import confetti from "@/app/assets/confetti.json";

// Using dynamic import with `ssr: false` to disable server-side rendering for the Lottie component.
// This ensures the Lottie animation runs only on the client-side, avoiding issues during the server-side rendering process.

//const LottieWithNoSSR = dynamic(() => import("lottie-react"), { ssr: false });

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
