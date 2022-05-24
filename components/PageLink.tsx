import type { FC } from 'react';
import { Box, ListItem, Tag, Text, VStack } from '@chakra-ui/react';
import { PageObject, Property, typedProperty } from '../lib/notion/types';
import { format } from 'date-fns'"date-fns"ink from 'next/link"next/link"ops = {
  page: PageObject;
};

export const PageLink: FC<Props> = ({ page }) => {
  const properties = page.properties as Property;
  const createdTime = typedProperty(properties, 'CreatedAt', 'created_time');
  const title = typedProperty(properties, 'Name', 'title');
  const tags = typedProperty(properties, 'Tags', 'multi_select');

  // TODO: リンク化する
  return (
    <ListItem minH={"100px"}>
      <VStack align={"start"}>
        <Box w={"150px"}>
          <Text fontSize={"md"} color={"gray.600"}>
            {format(new Date(createdTime), "yyyy年MM月dd日")}
          </Text>
        </Box>
        <Link href={"/hoge"}>
          <Text fontSize={"2xl"} fontWeight={"bold"} cursor={"pointer"}>
            {title[0]["plain_text"]}
          </Text>
        </Link>
        <Box>
          {tags &&
            tags.map((tag) => (
              <Tag key={tag.id} mr={4}>
                {tag.name}
              </Tag>
            ))}
        </Box>
      </VStack>
    </ListItem>
  );
};
