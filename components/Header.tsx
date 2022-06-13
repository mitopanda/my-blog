import type { FC } from 'react';
import { VStack, Heading } from '@chakra-ui/react';
import Link from 'next/link';

export const Header: FC = () => {
  return (
    <VStack py={4} align={'start'}>
      <Link href={'/'}>
        <Heading size={'md'} cursor={'pointer'}>
          mishitoshi&apos;s blog
        </Heading>
      </Link>
    </VStack>
  );
};
