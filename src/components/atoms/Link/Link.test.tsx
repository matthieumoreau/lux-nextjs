import React from 'react';
import Renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import {
  mockOffer,
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
    state: {
      currentLocale: 'fr',
      locales: ['fr', 'en', 'it', 'de', 'nl', 'ru'],
      device: 'desktop',
      domain: 'http://localhost:3000/',
      ctx: { query: {}, pathname: '/' },
      urls: [],
    },
  });
});

describe('<Link /> rendering', () => {
  it('renders correctly offer link', () => {
    const tree: ReactTestRendererJSON = Renderer.create(
      <Link href="/offer/offer" data={mockOffer}>
        Annonce
      </Link>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly IT page without data', () => {
    const tree: ReactTestRendererJSON = Renderer.create(
      <Link href="/it"> Homepage IT</Link>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly external website', () => {
    const tree: ReactTestRendererJSON = Renderer.create(
      <Link href="https://www.google.fr/">Google</Link>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
