import type { ReactNode } from 'react';
import { Hero } from '@/components/Hero/Hero';
import { PhotoCardStack } from '@/components/PhotoCardStack/PhotoCardStack';

const Home = (): ReactNode => {
  return (
    <>
      <Hero />
      <PhotoCardStack />
    </>
  );
};

export default Home;
