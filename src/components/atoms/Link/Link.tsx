import * as React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { i18n } from '@i18n';

const CustomLink = styled.a``;

type LinkProps = {
  href: string;
  url?: object;
  locale?: string;
  target?: string;
  as?: string;
  children?: any;
};

const Link: React.FunctionComponent<LinkProps> = ({
  href,
  url,
  locale,
  target,
  as,
  children,
  ...props
}) => {
  const router = useRouter();
  const domain = 'localhost';
  const currentLocale = 'fr';

  locale = locale || currentLocale;

  const handleClick = e => {
    e.preventDefault();
    return i18n.changeLanguage(locale).then(() => router.push(url, href)); // as = href
  };

  let attrs: any = {
    as,
    href,
    target:
      target ||
      (href.startsWith('/') || href.includes(domain) ? '_self' : '_blank'),
  };

  if (url) {
    attrs = { ...attrs, onClick: handleClick };
  }

  return (
    <CustomLink {...attrs} {...props}>
      {children}
    </CustomLink>
  );
};

export default Link;
