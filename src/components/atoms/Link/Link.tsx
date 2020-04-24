import * as React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import urlManager from '@utils/urlManager';
import { i18n } from '@i18n';
import { useGlobalContext } from '@store/GlobalContext';

const isString = (toBeDetermined: any): toBeDetermined is string => {
  return true;
};

type LinkProps = {
  target?: string;
  locale?: string;
  data?: object;
};

const CustomLink = styled.a<LinkProps>``;

const Link: React.FunctionComponent<LinkProps & NextLinkProps> = ({
  href,
  locale,
  data = {},
  children,
  target,
  passHref = true,
  ...props
}) => {
  const router = useRouter();
  const { domain, currentLocale } = useGlobalContext();

  /**
   *
   **/
  const getLinkProps = (pathname, locale, data) => {
    const ctx = urlManager.getPageUrl({ pathname }, locale, data);

    if (ctx === null) {
      return {
        href: pathname,
      };
    }
    let { asPath, query } = ctx;

    return {
      href: {
        pathname: ctx.pathname,
        query: query || {},
      },
      as: asPath,
    };
  };

  /**
   * If query local is different of currentLocale, we change currentLocale
   **/
  const handleClick = (e, props) => {
    const { href, as } = props;
    if (typeof href === 'object' && href.query.locale !== currentLocale) {
      e.preventDefault();
      i18n.changeLanguage(href.query.locale).then(() => router.push(href, as));
    }
  };

  if (isString(href)) {
    if (href.startsWith('/') || href.includes(domain)) {
      // Internal Link
      const nextLinkprops = getLinkProps(href, locale || currentLocale, data);
      return (
        <NextLink {...nextLinkprops} {...props}>
          <a onClick={e => handleClick(e, props)} target={'_self' || target}>
            {children}
          </a>
        </NextLink>
      );
    } else {
      // External Link
      return (
        <CustomLink href={href} target={'_blank' || target}>
          {children}
        </CustomLink>
      );
    }
  }
};

export default Link;
