import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';

import isEqual from 'lodash.isequal';

import { ParsedUrlQuery } from 'querystring';
import { i18n } from '@i18n';

type Ctx = {
  pathname: string;
  query: ParsedUrlQuery;
  asPath?: string;
  path?: string;
};

export type GlobalContextState = {
  currentLocale: string;
  locales: string[];
  device: 'mobile' | 'phone' | 'tablet' | 'desktop';
  domain: string;
  ctx: Ctx;
  urls: Array<any>;
};

export type GlobalContext = {
  state: GlobalContextState;
  dispatch?: any;
};

const GlobalContext = createContext<GlobalContext>(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_HEAD':
      // console.log(action.type, action.payload);
      return { ...state, head: action.payload };
    case 'SET_CTX':
      // console.log(action.type, action.payload);
      return { ...state, ctx: action.payload };
    case 'SET_URLS':
      // console.log(action.type, action.payload);
      return { ...state, urls: action.payload };
    case 'SET_CURRENT_LOCALE':
      // console.log(action.type, action.payload);
      return { ...state, currentLocale: action.payload };
    case 'SET_DEVICE':
      // console.log(action.type, action.payload);
      return { ...state, device: action.payload };
  }
};

const GlobalContextProvider = ({ value, children }) => {
  let [state, dispatch] = useReducer(reducer, value);
  const [isI18nInitialized, setIsI18nInitialized] = useState(null);

  // Change <html>'s language on languageChanged event
  if (typeof window !== undefined) {
    i18n.on('languageChanged', function(lang) {
      const html = document.querySelector('html');
      if (html) html.setAttribute('lang', lang);
    });
  }

  // const isArrayEqual = (x, y) => {
  //   return flow(xorWith(y, isEqual), isEmpty)(x);
  // };

  useEffect(() => {
    i18n.on('initialized', function(lang) {
      setIsI18nInitialized(true);
    });

    if (!isEqual(value.currentLocale, state.currentLocale)) {
      dispatch({
        type: 'SET_CURRENT_LOCALE',
        payload: value.currentLocale,
      });
    }

    if (!isEqual(value.ctx, state.ctx)) {
      dispatch({
        type: 'SET_CTX',
        payload: value.ctx,
      });
    }

    // if (!isEqual(value.urls['fr'].pathname, state.urls['fr'].pathname)) {
    if (!isEqual(value.urls, state.urls)) {
      dispatch({
        type: 'SET_URLS',
        payload: value.urls,
      });
    }

    if (!isEqual(value.device, state.device)) {
      dispatch({
        type: 'SET_DEVICE',
        payload: value.device,
      });
    }

    return () => {
      i18n.off('initialized', () => {});
    };
  }, [value.ctx, dispatch]);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {/* {isI18nInitialized ? children : <p>Loading</p>} */}
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default GlobalContextProvider;
