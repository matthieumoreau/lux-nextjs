import React from 'react';
import App from 'next/app';

import { i18n, appWithTranslation } from '@i18n';
import routes from '@config/routes';
import cookieManager from '@utils/cookieManager';
import deviceManager from '@utils/deviceManager';
import urlManager from '@utils/urlManager';
import GlobalContext from '@store/GlobalContext';

import Layout from '@components/templates/Layout/Layout';

function MyApp({ Component, pageProps, router, device, locale, ...props }) {
  const getLayout = Component.getLayout || (page => <Layout children={page} />);

  const ctx = {
    pathname: router.pathname,
    query: router.query,
    asPath: router.asPath,
    path: urlManager.getPath(router),
  };

  return (
    <GlobalContext.Provider
      value={{
        currentLocale: locale,
        locales: process.env.LOCALES.split(','),
        device,
        domain: process.env.DOMAIN,
        ctx,
        // urls: urlManager.getPageUrls(ctx),
      }}>
      {getLayout(<Component {...pageProps} />)}
    </GlobalContext.Provider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

MyApp.getInitialProps = async appContext => {
  const { ctx } = appContext;
  const { req, query } = ctx;

  const cookies = cookieManager.getAll(ctx);
  const localeFromPath = req
    ? req.originalUrl.match(
        '/(' + process.env.LOCALES.replace(/,/g, '|') + ')(/|$)'
      )
    : null;

  // Set locale query param by default
  if (query && !query.locale)
    query.locale = localeFromPath ? localeFromPath[1] : cookies.locale;

  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    locale: req ? req.language : i18n.language,
    device: req
      ? deviceManager(req.headers['user-agent'] || req.headers['User-Agent'])
      : deviceManager(window.navigator.userAgent),
  };
};

export default appWithTranslation(MyApp);
