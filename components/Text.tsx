import { FC } from 'react';
import { RichText } from '../lib/notion/types';
import { Text as ChakraText, Code } from '@chakra-ui/react';

export const Text: FC<RichText> = ({ annotations, ...props }) => {
  if (props.type !== 'text') {
    return null;
  }

  const colorKeyMap = {
    gray: 'gray.500',
    brown: 'yellow.900',
    orange: 'orange.500',
    yellow: 'yellow.400',
    green: 'green.500',
    blue: 'cyan.500',
    purple: 'purple.500',
    pink: 'pink.500',
    red: 'red.500',
  };

  const bgColorKeyMap = {
    gray_background: 'gray.100',
    brown_background: 'yellow.900',
    orange_background: 'orange.100',
    yellow_background: 'yellow.100',
    green_background: 'green.100',
    blue_background: 'blue.100',
    purple_background: 'purple.100',
    pink_background: 'pink.100',
    red_background: 'red.100',
  };

  const { bold, italic, strikethrough, underline, code, color } = annotations;
  const textDecoration =
    (strikethrough && 'line-through') || (underline && 'underline');
  const styleProps = {
    fontWeight: bold && 'bold',
    fontStyle: italic && 'italic',
    textDecoration,
    color: colorKeyMap[color] && colorKeyMap[color],
    backgroundColor: bgColorKeyMap[color] && bgColorKeyMap[color],
  };

  const linkProps = {
    as: 'a' as const,
    href: props.text.link?.url,
    textDecoration: 'underline',
    color: 'teal.500',
  };

  if (code) {
    return (
      <Code colorScheme={'yellow'} {...styleProps}>
        {props.text.content}
      </Code>
    );
  } else {
    return (
      <ChakraText
        display={'inline-block'}
        {...styleProps}
        {...(props.text.link ? linkProps : {})}
      >
        {props.text.content}
      </ChakraText>
    );
  }
};
