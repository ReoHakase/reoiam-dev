import type { ReactNode } from 'react';
import { Hero } from '@/components/Hero/Hero';
import { JsonLdScript } from '@/components/JsonLdScript/JsonLdScript';
import { MyPhotoCardStack } from '@/components/MyPhotoCardStack/MyPhotoCardStack';

const Home = (): ReactNode => {
  return (
    <>
      <JsonLdScript type="person" />
      <Hero />
      <MyPhotoCardStack />
    </>
  );
};

export default Home;
