import type { ReactNode } from 'react';
import type { Person, WithContext } from 'schema-dts';
import { baseUrl } from '@/utils/routes/baseUrl';

// NOTE: Check JSON-LD schema validity here: https://search.google.com/test/rich-results

const personJsonLd: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': baseUrl.toString(),
  description: "Reo Hakuta ('04🇯🇵) is a frontend developer / UI-UX designer / CS student based in Japan.",
  image: new URL('/selfie.webp', baseUrl).toString(),
  name: 'Reo Hakuta',
  givenName: 'Reo',
  familyName: 'Hakuta',
  birthDate: 'August 3rd, 2004',
  birthPlace: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hitachinaka',
      addressRegion: 'Ibaraki',
      addressCountry: 'Japan',
    },
  },
  email: 'st20152ro@gm.ibaraki-ct.ac.jp',
  url: baseUrl.toString(),
  height: '175 cm',
  sameAs: ['https://github.com/ReoHakase'],
  gender: 'male',
  nationality: 'Japan',
  jobTitle: 'Frontend Developer, UI/UX Designer',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'National Institute of Technology, Ibaraki College',
    sameAs: 'https://www.ibaraki-ct.ac.jp/',
  },
};

export type JsonLdScriptProps = {
  type: 'person';
};

/**
 * Renders a JSON-LD script.
 */
export const JsonLdScript = ({ type }: JsonLdScriptProps): ReactNode => {
  const jsonLd = (() => {
    switch (type) {
      case 'person':
        return personJsonLd;
    }
  })();

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
};
