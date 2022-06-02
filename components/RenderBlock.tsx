import type { FC } from 'react';
import { BlockObject } from '../lib/notion/types';
import { RichText } from './RichText';
import { Heading } from '@chakra-ui/react';
import { List } from './List';

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
          <Heading as={'h1'} size={'2xl'}>
            <RichText richTextArray={block.heading_1.rich_text}></RichText>
          </Heading>
        );
      case 'heading_2':
        return (
          <Heading as={'h2'} size={'xl'}>
            <RichText richTextArray={block.heading_2.rich_text}></RichText>
          </Heading>
        );
      case 'heading_3':
        return (
          <Heading as={'h3'} size={'lg'}>
            <RichText richTextArray={block.heading_3.rich_text}></RichText>
          </Heading>
        );
      case 'bulleted_list_item' || 'numbered_list_item':
        return <List blockObj={block}></List>;
      default:
        return <p>{JSON.stringify(block)}</p>;
    }
  };

  return <>{blockDom()}</>;
};
