import type { FC } from 'react';
import { BlockObject } from '../lib/notion/types';
import { RichText } from './RichText';
import { Box, Divider, Heading, HStack } from '@chakra-ui/react';
import { List } from './List';
import { Toggle } from './Toggle';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { Table } from './Table';

type Props = {
  block: BlockObject;
};

export const RenderBlock: FC<Props> = ({ block }) => {
  const blockDom = () => {
    switch (block.type) {
      case 'paragraph':
        return <RichText richTextArray={block.paragraph.rich_text}></RichText>;
      case 'heading_1':
        return (
          <Heading
            as={'h1'}
            size={'xl'}
            borderBottom={'1px'}
            w={'full'}
            borderColor={'gray.300'}
          >
            <RichText richTextArray={block.heading_1.rich_text}></RichText>
          </Heading>
        );
      case 'heading_2':
        return (
          <Heading as={'h2'} size={'lg'}>
            <RichText richTextArray={block.heading_2.rich_text}></RichText>
          </Heading>
        );
      case 'heading_3':
        return (
          <Heading as={'h3'} size={'md'}>
            <RichText richTextArray={block.heading_3.rich_text}></RichText>
          </Heading>
        );
      case 'bulleted_list_item' || 'numbered_list_item':
        return <List key={block.id} blockObj={block}></List>;
      case 'toggle':
        return (
          <Toggle
            richTextArray={block.toggle.rich_text}
            toggleChildren={block.children}
          ></Toggle>
        );
      case 'quote':
        return (
          <Box px={6} py={4} borderLeft={'4px'} borderColor={'gray.200'}>
            <RichText richTextArray={block.quote.rich_text}></RichText>
          </Box>
        );
      case 'divider':
        return <Divider></Divider>;
      case 'callout':
        return (
          <HStack backgroundColor={'blackAlpha.200'} p={4} w={'100%'}>
            <Box>
              {block.callout.icon.type === 'emoji' && block.callout.icon.emoji}
            </Box>
            <RichText richTextArray={block.callout.rich_text}></RichText>
          </HStack>
        );
      case 'code':
        return (
          <Box w={'100%'}>
            <SyntaxHighlighter language={block.code.language} style={monokai}>
              {block.code.rich_text[0].plain_text}
            </SyntaxHighlighter>
          </Box>
        );
      case 'table':
        return (
          <Table table={block.table} childrenBlocks={block.children}></Table>
        );
      default:
        return null;
    }
  };

  return <>{blockDom()}</>;
};
