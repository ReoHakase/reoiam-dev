import type { ReactNode } from 'react';
import { Hero } from '@/components/Hero/Hero';
import { MyPhotoCardStack } from '@/components/MyPhotoCardStack/MyPhotoCardStack';

const Home = (): ReactNode => {
  return (
    <>
      <Hero />
      <MyPhotoCardStack />
    </>
  );
};

export default Home;
