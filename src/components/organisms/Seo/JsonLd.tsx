import Head from 'next/head';

import seoManager from '@utils/seoManager';

const JsonLd = ({ data }) => {
  return (
    <Head>
      {data.map((jsonLd, i) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key={i}
          type="application/ld+json"
        />
      ))}
    </Head>
  );
};

export default JsonLd;
