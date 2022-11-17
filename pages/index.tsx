import type { GetStaticProps, NextPage } from 'next';
import { getPosts } from '../lib/notion';
import { PageObject } from '../lib/notion/types';
import { Box, List, Divider, Container } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PageLink } from '../components/PageLink';
import React from 'react';
import { Head } from '../components/Head';

type Props = {
  pages: PageObject[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
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

  return { props: { pages: data }, revalidate: 60 };
};

const Home: NextPage<Props> = ({ pages }) => {
  return (
    <>
      <Head />
      <Box minH={'100vh'} backgroundColor={'gray.100'}>
        <Container h={'100%'}>
          <Header></Header>
          <Box py={3}>
            <List spacing={3}>
              {pages.map((page) => (
                <React.Fragment key={page['id']}>
                  <PageLink page={page}></PageLink>
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Container>
        <Footer></Footer>
      </Box>
    </>
  );
};

export default Home;
