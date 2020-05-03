import { pathToRegexp, compile } from 'path-to-regexp';
import routes from '@config/routes';
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

  getPageUrl: (ctx, locale = 'en', data = null) => {
    if (typeof ctx !== 'object') return null;

    //** Check if pathname exists. If not, it is considered as an "asPath" to get the context. If not, return null  */
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

    if (data === null) {
      return urlManager.generateUrl(ctx.path, ctx.query);
    }

    const transactionType = urlManager.slugify(
      t(`${data.transactionType.translationKey}.slug`),
      { lower: true }
    );

    const propertyType = urlManager.slugify(
      t(`${data.propertyType.translationKey}.slug`),
      { lower: true }
    );

    const region = urlManager.slugify(
      data.locality.locality0.names[locale]
        ? data.locality.locality0.names[locale]
        : data.locality.locality0.country,
      { lower: true }
    );
    const town = urlManager.slugify(data.locality.locality2.names[locale], {
      lower: true,
    });
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
        // isExact, // whether or not we matched exactly
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

    if (zipCode.toString().length === 4) {
      zipCode = '0' + zipCode.toString();
    }

    return zipCode.toString().substr(0, 2);
  },

  /**
   * Slugify
   */
  slugify: (
    string: string,
    options?:
      | {
          replacement?: string;
          remove?: RegExp;
          lower?: boolean;
          strict?: boolean;
        }
      | string
  ): string => {
    const charMap = JSON.parse(
      '{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","‘":"\'","’":"\'","“":"\\"","”":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial"}'
    );
    if (typeof string !== 'string') {
      throw new Error('urlManager.slugify: string argument expected');
    }

    options =
      typeof options === 'string' ? { replacement: options } : options || {};

    const replacement = options.replacement || '-';

    let slug = string
      .split('')
      // replace characters based on charMap
      .reduce(function(result, ch) {
        return result + (charMap[ch] || ch);
      }, '')
      // remove not allowed characters
      .replace(options.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, '')
      // trim leading/trailing spaces
      .trim()
      // convert spaces to replacement character
      // also remove duplicates of the replacement character
      .replace(new RegExp('[\\s' + replacement + "']+", 'g'), replacement);

    if (options.lower) {
      slug = slug.toLowerCase();
    }

    if (options.strict) {
      // remove anything besides letters, numbers, and the replacement char
      slug = slug.replace(
        new RegExp('[^a-zA-Z0-9' + replacement + ']', 'g'),
        ''
      );
    }

    return slug;
  },
};

export default urlManager;
