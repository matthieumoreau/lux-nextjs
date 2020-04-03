import { createContext, useContext } from 'react';
import { ParsedUrlQuery } from 'querystring';

type Url = {
  pathname: string;
  query: ParsedUrlQuery;
  asPath?: string;
};

type GlobalContextProps = {
  currentLocale: string;
  locales: string[];
  device: 'mobile' | 'phone' | 'tablet' | 'desktop';
  domain: string;
  url: Url;
};

const GlobalContext = createContext<GlobalContextProps>(null);

export const useGlobalContext: any = () => useContext(GlobalContext);

export default GlobalContext;
