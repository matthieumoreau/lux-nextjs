import * as React from 'react';
import Link from '@components/atoms/Link/Link';

type LangSwitchProps = {
  url: any;
};

const LangSwitch: React.FunctionComponent<LangSwitchProps> = ({ url }) => {
  const { query, pathname } = url;
  return (
    <>
      {process.env.LOCALES.split(',').map((locale, index) => (
        <Link
          as="button"
          key={index}
          locale={locale}
          href={`/${locale}`}
          url={{
            pathname,
            query,
          }}>
          {locale}
        </Link>
      ))}
    </>
  );
};

export default LangSwitch;
