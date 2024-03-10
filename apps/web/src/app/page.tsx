import type { ReactNode } from 'react';
import { JsonLdScript } from '@/components/JsonLdScript/JsonLdScript';
import { Hero } from '@/features/landingPage/components/Hero/Hero';
import { MyPhotoCardStack } from '@/features/landingPage/components/MyPhotoCardStack/MyPhotoCardStack';
import { css } from 'styled-system/css';

const Home = (): ReactNode => {
  return (
    <main
      className={css({
        w: 'full',
        display: 'flex',
        flexGrow: 1,
        flexDir: 'column',
        justifyContent: 'start',
        alignItems: 'center',
      })}
    >
      <JsonLdScript type="person" />
      <Hero />
      <MyPhotoCardStack />
    </main>
  );
};

export default Home;
