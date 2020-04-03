import * as React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { i18n } from '@i18n';
import { useGlobalContext } from '@store/GlobalContext';

const CustomLink = styled.a``;

type LinkProps = {
  href: string;
  url?: any;
  locale?: string;
  target?: string;
  as?: string;
  isShallow?: boolean;
  children?: any;
};

const Link: React.FunctionComponent<LinkProps> = ({
  href,
  locale,
  target,
  as = '',
  children,
  isShallow = false,
  ...props
}) => {
  const router = useRouter();
  const { url, domain, currentLocale } = useGlobalContext();

  locale = locale || currentLocale;
  if (url && url.query) url.query.locale = currentLocale;

  const handleClick = e => {
    e.preventDefault();
    return i18n
      .changeLanguage(locale)
      .then(() => router.push(url, href, { shallow: isShallow })); // as = href
  };

  let attrs: any = {
    as,
    href,
    target:
      target ||
      (href.startsWith('/') || href.includes(domain) ? '_self' : '_blank'),
  };

  if (url) {
    attrs = {
      ...attrs,
      onClick: handleClick,
    };
  }

  return (
    <CustomLink {...attrs} {...props}>
      {children}
    </CustomLink>
  );
};

export default Link;
