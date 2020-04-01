import * as React from 'react';
import Link from '@components/atoms/Link/Link';

type LangSwitchProps = {
  url: any;
};

const LangSwitch: React.FunctionComponent<LangSwitchProps> = ({
  url,
  ...props
}) => {
  const { asPath, query, pathname } = url;
  return (
    <>
      {process.env.LOCALES.split(',').map((locale, index) => (
        <>
          <Link
            key={index}
            locale={locale}
            href={asPath}
            url={{
              pathname,
              query,
            }}>
            {locale}
          </Link>{' '}
        </>
      ))}
    </>
  );
};

export default LangSwitch;
