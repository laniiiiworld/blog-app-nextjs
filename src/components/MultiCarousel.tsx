'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ReactNode } from 'react';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
  },
};

type Props = {
  children: ReactNode;
};

export default function MultiCarousel({ children }: Props) {
  return (
    <Carousel //
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      transitionDuration={500}
      itemClass='m-2'
    >
      {children}
    </Carousel>
  );
}
