import type { FC } from 'react';
import Link from 'next/link';
import { Tag } from '@chakra-ui/react';
import { MultiSelect } from '../lib/notion/types';

type Props = {
  tag: MultiSelect;
};

export const TagLink: FC<Props> = ({ tag }) => {
  const colorMap = {
    default: 'blackAlpha',
    brown: 'facebook',
  };

  return (
    <Link href={`/tags/${tag.name}`}>
      <Tag
        colorScheme={colorMap[tag.color] ? colorMap[tag.color] : tag.color}
        variant={'outline'}
        mr={4}
        mb={2}
        cursor={'pointer'}
      >
        {tag.name}
      </Tag>
    </Link>
  );
};
