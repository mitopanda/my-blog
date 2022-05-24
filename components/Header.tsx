import type { FC } from 'react';
import { VStack, Heading } from '@chakra-ui/react';
import Link from 'next/link';

export const Header: FC = () => {
  return (
    <VStack my={4}>
      <Link href={'/'}>
        <Heading cursor={'pointer'}>mishitoshi's blog</Heading>
      </Link>
    </VStack>
  );
};
