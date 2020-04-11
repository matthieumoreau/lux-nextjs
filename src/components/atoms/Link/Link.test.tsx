import React from 'react';
import Renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import {
  mockNextUseRouter,
  mockUseGlobalContext,
} from './../../../../tests/mocks';

import Link from './Link';

beforeEach(() => {
  // Mocks Next.js route
  mockNextUseRouter({
    route: '/',
    pathname: '/home/home',
    query: '',
    asPath: '/',
  });

  // Mocks Global context
  mockUseGlobalContext({
    currentLocale: 'fr',
    locales: ['fr', 'en', 'it', 'de', 'nl', 'ru'],
    device: 'desktop',
    domain: 'http://localhost:3000/',
    url: { query: {}, pathname: '/' },
  });
});

describe('<Link /> rendering', () => {
  it('renders correctly', () => {
    const tree: ReactTestRendererJSON = Renderer.create(
      <Link href="https://www.google.com/" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
