import React, { Suspense } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import LazyLoadImage from 'react-lazyload';

interface LazyLottieProps {
  src: string;
}

const LazyLottie: React.FC<LazyLottieProps> = ({ src }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyLoadImage>
        <img src={src} alt="Lottie Animation" />
      </LazyLoadImage>
    </Suspense>
  );
};

export default LazyLottie;