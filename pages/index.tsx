import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getPosts } from '../lib/notion';

// FIXME: 型どうするか考える
type Props = {
  pages: any;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getPosts();
  return { props: { pages: data } };
};

const Home: NextPage<Props> = ({ pages }) => {
  return <></>;
};

export default Home;
