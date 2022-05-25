import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Box, List, Divider, Container, Text } from '@chakra-ui/react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { PageLink } from '../../components/PageLink';
import { PageObject } from '../../lib/notion/types';
import { getPosts } from '../../lib/notion';

type Props = {
  pages: PageObject[];
  tagName: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const tagName = query.name as string;

  const data = await getPosts({
    filter: {
      and: [
        {
          property: 'Publish',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'Tags',
          multi_select: {
            contains: tagName,
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

  return { props: { pages: data, tagName } };
};

const TagPage: NextPage<Props> = ({ pages, tagName }) => {
  return (
    <Box minH={'100vh'}>
      <Header></Header>
      <Container>
        <Text>{tagName}の記事一覧</Text>
        <List spacing={3}>
          {pages.map((page) => (
            <>
              <Divider />
              <PageLink key={page['id']} page={page}></PageLink>
            </>
          ))}
        </List>
      </Container>
      <Footer></Footer>
    </Box>
  );
};

export default TagPage;
