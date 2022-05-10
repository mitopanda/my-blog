import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getPosts } from '../lib/notion';
import { PageObject } from '../lib/notion/types';
import { Box } from '@chakra-ui/react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

// FIXME: 型どうするか考える
type Props = {
  pages: PageObject[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getPosts();
  return { props: { pages: data } };
};

const Home: NextPage<Props> = ({ pages }) => {
  return (
    <Box minH={'100vh'}>
      <Header></Header>
      <Footer></Footer>
    </Box>
  );
};

export default Home;
