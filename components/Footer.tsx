import type { FC } from 'react';
import { Center, Text } from '@chakra-ui/react';

export const Footer: FC = () => {
  return (
    <Center position={'sticky'} top={'100vh'}>
      <Text fontSize={'xs'}>© 2022 mishitoshi.com</Text>
    </Center>
  );
};
