import { FC } from 'react';
import { RichText } from '../lib/notion/types';
import { Text as ChakraText, Code } from '@chakra-ui/react';

export const Text: FC<RichText> = ({ annotations, ...props }) => {
  if (props.type !== 'text') {
    return null;
  }

  const colorKeyMap = {
    gray: 'gray.700',
    brown: 'orange.900',
    orange: 'orange.500',
    yellow: 'yellow.500',
    green: 'green.600',
    blue: 'cyan.600',
    purple: 'purple.600',
    pink: 'pink.600',
    red: 'red.600',
  };

  const bgColorKeyMap = {
    gray_background: 'gray.100',
    brown_background: '#baa291',
    orange_background: 'orange.100',
    yellow_background: 'yellow.100',
    green_background: 'green.100',
    blue_background: 'blue.100',
    purple_background: 'purple.100',
    pink_background: 'pink.100',
    red_background: 'red.200',
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
    _visited: { color: 'teal.700' },
  };

  if (code) {
    return (
      <Code colorScheme={'gray'} display={'inline'} {...styleProps}>
        {props.text.content}
      </Code>
    );
  } else {
    return (
      <ChakraText
        display={'inline'}
        letterSpacing={'wide'}
        lineHeight={'base'}
        {...styleProps}
        {...(props.text.link ? linkProps : {})}
      >
        {props.text.content}
      </ChakraText>
    );
  }
};
