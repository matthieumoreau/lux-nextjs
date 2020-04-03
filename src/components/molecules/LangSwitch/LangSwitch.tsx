import * as React from 'react';
import Link from '@components/atoms/Link/Link';

type LangSwitchProps = {};

const LangSwitch: React.FunctionComponent<LangSwitchProps> = () => {
  return (
    <>
      {process.env.LOCALES.split(',').map((locale, index) => (
        <Link as="button" key={index} locale={locale} href={`/${locale}`}>
          {locale}
        </Link>
      ))}
    </>
  );
};

export default LangSwitch;
