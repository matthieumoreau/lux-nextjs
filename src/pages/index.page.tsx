import { NextPage } from 'next';
import styled from 'styled-components';

import '../styles/index.less';
interface Props {
  userAgent?: string;
}

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const Page: NextPage<Props> = ({ userAgent }) => (
  <>
    <Title>My page</Title>
    <div className="example">Hello World!</div>
    <main>Your user agent: {userAgent}</main>
  </>
);

Page.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default Page;
