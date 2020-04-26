import LangSwitch from '@components/molecules/LangSwitch/LangSwitch';

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <p>HEADER</p>
        <LangSwitch />
      </header>

      <main>{children}</main>

      <header>
        <p>FOOTER</p>
      </header>
    </>
  );
};

export const getLayout = page => <Layout>{page}</Layout>;

export default Layout;
