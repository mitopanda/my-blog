import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getPosts } from '../lib/notion';
import { PageObject } from '../lib/notion/types';
import {
  Box,
  List,
  ListItem,
  VStack,
  Divider,
  Container,
} from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PageLink } from '../components/PageLink';

type Props = {
  pages: PageObject[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data = await getPosts();
  return { props: { pages: data } };
};

const Home: NextPage<Props> = ({ pages }) => {
  return (
    <Box minH={'100vh'}>
      <Header></Header>
      <Container>
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

export default Home;
