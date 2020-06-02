import React from 'react';

import LangSwitch from '@components/molecules/LangSwitch/LangSwitch';
import Head from '@components/organisms/Head/Head';

const Layout = ({ children }) => {
  return (
    <>
      <Head />
      <header>
        <p>HEADER</p>
        <LangSwitch />
      </header>

      <main>{children}</main>

      <footer>
        <p>FOOTER</p>
      </footer>
    </>
  );
};

export default Layout;
