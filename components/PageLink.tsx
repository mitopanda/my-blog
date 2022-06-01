import type { FC } from 'react';
import { Box, ListItem, Tag, Text, VStack } from '@chakra-ui/react';
import { PageObject, appropriateProperty } from '../lib/notion/types';
import { format } from 'date-fns';
import Link from 'next/link';

type Props = {
  page: PageObject;
};

export const PageLink: FC<Props> = ({ page }) => {
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
    <ListItem minH={'100px'}>
      <VStack align={'start'}>
        <Box w={'150px'}>
          <Text fontSize={'md'} color={'gray.600'}>
            {format(new Date(created_time), 'yyyy年MM月dd日')}
          </Text>
        </Box>
        <Link href={`/${page.id}`}>
          <Text fontSize={'2xl'} fontWeight={'bold'} cursor={'pointer'}>
            {title[0]['plain_text']}
          </Text>
        </Link>
        <Box>
          {multi_select &&
            multi_select.map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.name}`}>
                <Tag mr={4} cursor={'pointer'}>
                  {tag.name}
                </Tag>
              </Link>
            ))}
        </Box>
      </VStack>
    </ListItem>
  );
};
