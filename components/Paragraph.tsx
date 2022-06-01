import type { FC } from 'react';
import { RichText } from '../lib/notion/types';
import { Text } from './Text';

type Props = {
  richTextArray: RichText[];
};

export const Paragraph: FC<Props> = ({ richTextArray }) => {
  const switchTextComponent = (richText: RichText) => {
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
