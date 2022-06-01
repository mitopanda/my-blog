import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getBlocks } from '../lib/notion';
import { BlockObject } from '../lib/notion/types';
import { Box, VStack, Text } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { RenderBlock } from '../components/RenderBlock';

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
        {blocks.length > 0 &&
          blocks.map((block) => (
            <RenderBlock key={block.id} block={block}></RenderBlock>
          ))}
      </VStack>
      <Footer></Footer>
    </Box>
  );
};

export default Article;
