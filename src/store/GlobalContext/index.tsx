import { createContext, useContext } from 'react';
import { ParsedUrlQuery } from 'querystring';

type Ctx = {
  pathname: string;
  query: ParsedUrlQuery;
  asPath?: string;
  path?: string;
};

export type GlobalContextProps = {
  currentLocale: string;
  locales: string[];
  device: 'mobile' | 'phone' | 'tablet' | 'desktop';
  domain: string;
  ctx: Ctx;
  urls?: any;
};

const GlobalContext = createContext<GlobalContextProps>(null);

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContext;
