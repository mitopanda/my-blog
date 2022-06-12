import type { FC } from 'react';
import { Box, ListItem, Tag, Text, VStack } from '@chakra-ui/react';
import { PageObject, appropriateProperty } from '../lib/notion/types';
import { format } from 'date-fns';
import Link from 'next/link';
import { TagLink } from './TagLink';

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
          <Text fontSize={'sm'} color={'gray.600'}>
            {format(new Date(created_time), 'yyyy/MM/dd')}
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
              <TagLink key={tag.id} tag={tag}></TagLink>
            ))}
        </Box>
      </VStack>
    </ListItem>
  );
};
