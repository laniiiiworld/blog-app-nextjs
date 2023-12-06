'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Post } from '@/service/posts';
import PostItem from './PostItem';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

type Props = {
  posts: Post[];
};

export default function CarouselPostList({ posts }: Props) {
  const filteredPosts = posts.filter((post) => post.featured === false);

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      customTransition='all .5'
      transitionDuration={500}
      removeArrowOnDeviceType={['tablet', 'mobile']}
      sliderClass='gap-4'
      itemClass='rounded-md overflow-hidden shadow-md cursor-pointer my-2 w-80 hover:bg-yellow-50'
    >
      {filteredPosts.map((post) => (
        <PostItem key={post.path} post={post} />
      ))}
    </Carousel>
  );
}
