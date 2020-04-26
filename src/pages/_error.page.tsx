import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { useGlobalContext } from '@store/GlobalContext';
import urlManager from '@utils/urlManager';
import Link from '@components/atoms/Link/Link';

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>

      <Link href="/home/home">Homepage</Link>
    </>
  );
};

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {
    namespacesRequired: ['common'],
    statusCode,
  };
};

export default Error;
