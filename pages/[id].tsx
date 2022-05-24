import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getPosts } from '../lib/notion';
import { PageObject } from '../lib/notion/types';
import { Box, List, ListItem, VStack, Text } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type Props = {
  pages: PageObject[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data = await getPosts();
  return { props: { pages: data } };
};

const Page: NextPage<Props> = ({ pages }) => {
  return (
    <Box minH={'100vh'}>
      <Header></Header>
      <VStack>
        <Text>hoge</Text>
      </VStack>
      <Footer></Footer>
    </Box>
  );
};

export default Page;
