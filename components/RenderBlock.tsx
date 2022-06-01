import type { FC } from 'react';
import { BlockObject } from '../lib/notion/types';
import { Paragraph } from './Paragraph';

type Props = {
  block: BlockObject;
};

export const RenderBlock: FC<Props> = ({ block }) => {
  const blockDom = () => {
    switch (block.type) {
      case 'paragraph':
        return (
          <>
            <p>{JSON.stringify(block)}</p>
            <Paragraph richTextArray={block.paragraph.rich_text}></Paragraph>
          </>
        );
      default:
        return <p>{JSON.stringify(block)}</p>;
    }
  };

  return <>{blockDom()}</>;
};
