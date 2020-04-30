const seoManager = {
  getOfferTitle: (data, locale) => {
    return 'TITLE OFFER';
  },
  getlanguageAlternates: (domain, urls) => {
    return Object.entries(urls).reduce((acc, [key, value]: any) => {
      acc.push({
        hrefLang: key,
        href: `${domain}${value.asPath}`,
      });
      return acc;
    }, []);
  },
};

export default seoManager;
