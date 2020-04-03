import NextI18Next, { InitConfig } from 'next-i18next';
import { common, detection } from './config.i18n';

const nextI18next = new NextI18Next({
  ...common,
  detection,
});

export default nextI18next;
export const includeDefaultNamespaces = namespaces =>
  ['common', '_error'].concat(namespaces);
export const {
  Link,
  appWithTranslation,
  withTranslation,
  Trans,
  i18n,
} = nextI18next;
