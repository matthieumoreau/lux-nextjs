import LangSwitch from '@components/molecules/LangSwitch/LangSwitch';

const Layout = ({ children }) => {
  return (
    <>
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
