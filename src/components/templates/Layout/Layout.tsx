import LangSwitch from '@components/molecules/LangSwitch/LangSwitch';
import { useGlobalContext } from '@store/GlobalContext';

const Layout = ({ children }) => {
  const { currentLocale } = useGlobalContext();
  return (
    <>
      <header>
        <p>HEADER</p>
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
