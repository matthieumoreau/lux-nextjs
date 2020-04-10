import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';

export type ApolloContext<C = any> = ApolloPageContext<C> | ApolloAppContext<C>;

type TApolloClient = ApolloClient<NormalizedCacheObject>;

type InitialProps = {
  apolloClient: TApolloClient;
  apolloState: any;
} & Record<string, any>;

type WithApolloPageContext = {
  apolloClient: TApolloClient;
} & NextPageContext;
