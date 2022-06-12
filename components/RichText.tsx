import type { FC } from 'react';
import { RichText as RichTextType } from '../lib/notion/types';
import { Text } from './Text';
import React from 'react';
import { Box } from '@chakra-ui/react';

type Props = {
  richTextArray: RichTextType[] | null;
};

export const RichText: FC<Props> = ({ richTextArray }) => {
  if (richTextArray === null) {
    return null;
  }

  const switchTextComponent = (richText: RichTextType) => {
    switch (richText.type) {
      case 'text':
        return <Text {...richText}></Text>;
      default:
        return <p>{JSON.stringify(richText)}</p>;
    }
  };

  return (
    <Box>
      {richTextArray &&
        richTextArray.map((richText) => (
          <React.Fragment key={richText.plain_text}>
            {switchTextComponent(richText)}
          </React.Fragment>
        ))}
    </Box>
  );
};
