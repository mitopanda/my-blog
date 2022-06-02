import type { FC } from 'react';
import { RichText as RichTextType } from '../lib/notion/types';
import { Text } from './Text';

type Props = {
  richTextArray: RichTextType[];
};

export const RichText: FC<Props> = ({ richTextArray }) => {
  const switchTextComponent = (richText: RichTextType) => {
    switch (richText.type) {
      case 'text':
        return <Text {...richText}></Text>;
      default:
        return <p>{JSON.stringify(richText)}</p>;
    }
  };

  return (
    <div>
      {richTextArray &&
        richTextArray.map((richText) => <>{switchTextComponent(richText)}</>)}
    </div>
  );
};
