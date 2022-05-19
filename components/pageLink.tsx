import type { FC } from 'react';
import { Center, Flex, ListItem, Text } from '@chakra-ui/react';
import { PageObject, Property, typedProperty } from '../lib/notion/types';
import { format } from 'date-fns';

type Props = {
  page: PageObject;
};

// TODO: リンク化する
export const PageLink: FC<Props> = ({ page }) => {
  const properties = page.properties as Property;
  const createdTime = typedProperty(properties, 'CreatedAt', 'created_time');
  const title = typedProperty(properties, 'Name', 'title');
  const tags = typedProperty(properties, 'Tags', 'multi_select');

  return (
    <ListItem>
      <Flex>
        <Center>
          <Text>{format(new Date(createdTime), 'yyyy年MM月dd日')}</Text>
        </Center>
        <Center>
          <Text>{title[0]['plain_text']}</Text>
        </Center>
        <Center>{JSON.stringify(tags)}</Center>
      </Flex>
    </ListItem>
  );
};
