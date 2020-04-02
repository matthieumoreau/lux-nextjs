import React from 'react';
import App from 'next/app';
import { appWithTranslation, i18n } from '@i18n';
import cookieManager from '@utils/cookieManager';
import deviceManager from '@utils/deviceManager';
import GlobalContext from '@store/GlobalContext';

function MyApp({ Component, pageProps, router, locale, device, ...props }) {
  console.log(router.pathname, router.query, router.asPath);
  return (
    <GlobalContext.Provider
      value={{
        currentLocale: locale,
        locales: process.env.LOCALES,
        device,
        domain: '',
        url: {
          pathname: router.pathname,
          query: router.query,
          asPath: router.asPath,
        },
        seo: {
          canonicalUrls: {
            fr: '',
            en: '',
          },
        },
      }}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

MyApp.getInitialProps = async appContext => {
  // console.log('appContext', appContext);
  const { ctx } = appContext;
  const { req, query, pathname, asPath } = ctx;

  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    locale: query.locale,
    device: req
      ? deviceManager(req.headers['user-agent'] || req.headers['User-Agent'])
      : deviceManager(window.navigator.userAgent),
  };
};

export default appWithTranslation(MyApp);
