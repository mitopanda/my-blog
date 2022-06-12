import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getBlocks, getPosts, getPost } from '../lib/notion';
import {
  appropriateProperty,
  BlockObject,
  PageObject,
} from '../lib/notion/types';
import { Box, VStack, Text, Container, Heading } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { RenderBlock } from '../components/RenderBlock';
import { format } from 'date-fns';
import Link from 'next/link';
import { TagLink } from '../components/TagLink';

type Props = {
  blocks: BlockObject[];
  page: PageObject;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getPosts({
    filter: {
      or: [
        {
          property: 'Publish',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'CreatedAt',
        direction: 'descending',
      },
    ],
  });

  return {
    paths: data.map((page) => `/${page.id}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const blockId = params.id as string;

  const page = await getPost(blockId);
  console.log(page);
  const data = await getBlocks(blockId);
  return { props: { blocks: data, page: page } };
};

const Article: NextPage<Props> = ({ blocks, page }) => {
  const properties = page.properties;
  const { created_time } = appropriateProperty(
    properties,
    'CreatedAt',
    'created_time'
  );
  const { title } = appropriateProperty(properties, 'Name', 'title');
  const { multi_select } = appropriateProperty(
    properties,
    'Tags',
    'multi_select'
  );

  return (
    <Box minH={'100vh'} backgroundColor={'gray.50'}>
      <Container maxW={{ base: '100%', lg: '55%' }} p={0}>
        <Box px={6} background={'gray.50'}>
          <Header></Header>
        </Box>
        <Box p={6} m={0} backgroundColor={'#FFF'} borderRadius={'20px'}>
          <VStack align={'center'} mb={4} spacing={2}>
            <Text as={'span'} fontSize={'sm'} color={'gray.600'}>
              {format(new Date(created_time), 'yyyy/MM/dd')}
            </Text>
            <Heading as={'h1'} size={'xl'}>
              {title[0].plain_text}
            </Heading>
            <Text></Text>
            <Box>
              {multi_select &&
                multi_select.map((tag) => (
                  <TagLink key={tag.id} tag={tag}></TagLink>
                ))}
            </Box>
          </VStack>
          <VStack align={'start'} spacing={6}>
            {blocks.length > 0 &&
              blocks.map((block) => (
                <RenderBlock key={block.id} block={block}></RenderBlock>
              ))}
          </VStack>
        </Box>
      </Container>

      <Footer></Footer>
    </Box>
  );
};

export default Article;
