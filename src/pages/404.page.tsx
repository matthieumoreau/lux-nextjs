import React from 'react';
import { useTranslation } from '@i18n';

const Custom404 = () => {
  const { t } = useTranslation();
  return <h1> {t('hello')} 404 - Page Not Found</h1>;
};

export default Custom404;
