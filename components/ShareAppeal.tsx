import { FC } from 'react';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import {
  HatenaIcon,
  HatenaShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

type Props = {
  url: string;
  title: string;
};

export const ShareAppeal: FC<Props> = ({ url, title }) => {
  return (
    <VStack spacing={8} mt={10}>
      <Flex justify={'center'}>
        <Text color={'gray.600'} fontSize={'sm'}>
          最後まで読んでいただきありがとうございました！
        </Text>
      </Flex>
      <HStack justify={'center'} spacing={4}>
        <TwitterShareButton url={url} title={title} via={'mishitoshiii'}>
          <TwitterIcon round={true} size={32} />
        </TwitterShareButton>
        <HatenaShareButton title={title} url={url}>
          <HatenaIcon round={true} size={32} />
        </HatenaShareButton>
      </HStack>
    </VStack>
  );
};
