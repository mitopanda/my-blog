import type { FC } from 'react';
import { Center, Text } from '@chakra-ui/react';
import Link from 'next/link';

export const Footer: FC = () => {
  return (
    <Center position={'sticky'} top={'100vh'} py={4}>
      <Text fontSize={'xs'}>
        © 2022 <Link href={'/'}>{"mishitoshi's blog"}</Link>
      </Text>
    </Center>
  );
};
