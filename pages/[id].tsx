import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getBlocks } from '../lib/notion';
import { BlockObject } from '../lib/notion/types';
import { Box, VStack, Text } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type Props = {
  blocks: BlockObject[];
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const blockId = query.id as string;
  const data = await getBlocks(blockId);
  return { props: { blocks: data } };
};

const Article: NextPage<Props> = ({ blocks }) => {
  return (
    <Box minH={'100vh'}>
      <Header></Header>
      <VStack>
        <Text>{JSON.stringify(blocks)}</Text>
      </VStack>
      <Footer></Footer>
    </Box>
  );
};

export default Article;
