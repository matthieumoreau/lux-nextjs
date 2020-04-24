import NextI18Next from 'next-i18next';
import { common, detection } from './config.i18n';

const nextI18next = new NextI18Next({
  ...common,
  detection,
});

export default nextI18next;
// export const includeDefaultNamespaces = namespaces =>
//   ['common', '_error'].concat(namespaces);

export const {
  i18n,
  appWithTranslation,
  withTranslation,
  useTranslation,
} = nextI18next;
