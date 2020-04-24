import { pathToRegexp, compile } from 'path-to-regexp';
import routes from '@config/routes';
import slugify from 'slugify';
import { i18n } from '@i18n';

const locales = process.env.LOCALES;

const urlManager = {
  getPageUrls: (ctx, data = null) => {
    let urls: Array<any> = [];

    locales.split(',').map(locale => {
      return (urls[locale] = urlManager.getPageUrl(ctx, locale, data));
    });

    return urls;
  },

  getPageUrl: (ctx, locale = 'fr', data = null) => {
    if (typeof ctx !== 'object') return null;

    //** Check if pathname exists. If not, consider it as an "asPath" and try   */
    if (
      Object.entries(routes).filter(
        ([key, value]) => value.pathname === ctx.pathname
      ).length === 0
    ) {
      ctx = urlManager.generateCtxFromAsPath(ctx.pathname);
      if (ctx === null) return null;
      locale = ctx.query.locale || locale;

      const verifiedCtx = urlManager.matchAsPath(ctx.asPath, {
        path: ctx.path,
        pathname: ctx.pathname,
        exact: true,
        strict: true,
      });

      if (verifiedCtx) {
        return verifiedCtx;
      }

      return null;
    }

    ctx.path = ctx.path || urlManager.getPath(ctx);
    let url: string;

    switch (ctx.pathname) {
      case '/home/home':
        url = urlManager.getHomePageUrl(ctx, locale);
        break;

      case '/offer/offer':
        url = urlManager.getOfferPageUrl(ctx, locale, data);
        break;

      default:
        return null;
    }

    const verifiedCtx = urlManager.matchAsPath(url, {
      path: ctx.path,
      pathname: ctx.pathname,
      exact: true,
      strict: true,
    });

    if (verifiedCtx) {
      return verifiedCtx;
    }

    return null;
  },

  getHomePageUrl: (ctx, locale) => {
    return urlManager.generateUrl(ctx.path, {
      locale,
    });
  },

  getOfferPageUrl: (ctx, locale, data) => {
    const t = i18n.getFixedT(locale);
    const transactionType = slugify(
      t(`${data.transactionType.translationKey}.slug`)
    );

    const propertyType = slugify(t(`${data.propertyType.translationKey}.slug`));

    const region = slugify(
      data.locality.locality0.name
        ? data.locality.locality0.name
        : data.locality.locality0.country
    );
    const town = slugify(data.locality.locality2.name);
    const departmentZip = urlManager.formatZipCode(data.locality.locality2.zip);

    return urlManager.generateUrl(ctx.path, {
      locale,
      transactionType,
      propertyType,
      region: region || null,
      departmentZip: departmentZip || null,
      town: town || null,
      offerId: data.offerId,
    });
  },

  /**
   * Public API for generating a URL pathname from a path and parameters.
   */
  generateUrl: (path = '/', params = {}) => {
    const cache = {};
    const cacheLimit = 10000;
    let cacheCount = 0;

    const compilePath = path => {
      if (cache[path]) return cache[path];

      const generator = compile(path);

      if (cacheCount < cacheLimit) {
        cache[path] = generator;
        cacheCount++;
      }

      return generator;
    };

    return path === '/' ? path : compilePath(path)(params, { pretty: true });
  },

  /**
   * Public API for matching a URL pathname to a path.
   */
  matchAsPath: (asPath, options = {}) => {
    if (typeof options === 'string' || Array.isArray(options)) {
      options = { path: options };
    }

    const cache = {};
    const cacheLimit = 10000;
    let cacheCount = 0;

    const compilePath = (path, options) => {
      const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
      const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

      if (pathCache[path]) return pathCache[path];

      const keys = [];
      const regexp = pathToRegexp(path, keys, options);
      const result = { regexp, keys };

      if (cacheCount < cacheLimit) {
        pathCache[path] = result;
        cacheCount++;
      }

      return result;
    };

    const {
      path,
      pathname,
      exact = false,
      strict = false,
      sensitive = false,
    }: any = options;

    const paths = [].concat(path);

    return paths.reduce((matched, path) => {
      if (!path && path !== '') return null;
      if (matched) return matched;

      const { regexp, keys } = compilePath(path, {
        end: exact,
        strict,
        sensitive,
      });
      const match = regexp.exec(asPath);

      if (!match) return null;

      const [url, ...values] = match;
      const isExact = asPath === url;

      if (exact && !isExact) return null;

      return {
        path, // the path used to match
        pathname: pathname,
        asPath: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
        isExact, // whether or not we matched exactly
        query: keys.reduce((memo, key, index) => {
          memo[key.name] = values[index];
          return memo;
        }, {}),
      };
    }, null);
  },

  getPath: ctx => {
    return Object.entries(routes)
      .filter(([key, value]: any) =>
        value.pathname === ctx.pathname ? value.path : null
      )
      .reduce((obj, [key, value]: any) => (obj = value.path), '');
  },

  generateCtxFromAsPath: asPath => {
    const match = Object.entries(routes)
      .map(([key, value]) => {
        return urlManager.matchAsPath(asPath, {
          path: value.path,
          pathname: value.pathname,
          exact: true,
          strict: true,
        });
      })
      .filter(ctx => ctx !== null);

    if (match.length === 0) return null;

    return {
      pathname: match[0].pathname,
      query: match[0].query,
      asPath: match[0].asPath,
      path: match[0].path,
    };
  },

  /**
   * Format the ZIP code
   */
  formatZipCode: zipCode => {
    if (zipCode === null) {
      zipCode = '';
    }

    if (zipCode[0] !== '0' || zipCode[1] !== '0') {
      return zipCode.toString().substr(0, 2);
    }
    return zipCode.toString().substr(2, 3);
  },
};

export default urlManager;
