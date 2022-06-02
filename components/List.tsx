import type { FC } from 'react';
import { BlockObject } from '../lib/notion/types';
import { ListItem, OrderedList, UnorderedList } from '@chakra-ui/react';
import { RichText } from './RichText';

type Props = {
  blockObj: BlockObject;
};

// FIXME: クソコードオブザイヤー
// TODO: ordered listを正しい順番で表示したい
export const List: FC<Props> = ({ blockObj }) => {
  if (!['bulleted_list_item', 'numbered_list_item'].includes(blockObj.type)) {
    return null;
  }

  const buildListDom = (
    block: BlockObject,
    previousType: BlockObject['type'] | undefined,
    isChild = false
  ) => {
    if (
      block.type === 'bulleted_list_item' &&
      (previousType === undefined || block.type !== previousType || isChild)
    ) {
      return (
        <UnorderedList>
          <ListItem>
            <RichText
              richTextArray={block.bulleted_list_item.rich_text}
            ></RichText>
          </ListItem>
          {block.children &&
            block.children.map((child) =>
              buildListDom(
                child,
                block.children.length > 1 ? block.type : child.type,
                true
              )
            )}
        </UnorderedList>
      );
    } else if (
      block.type === 'numbered_list_item' &&
      (previousType === undefined || block.type !== previousType || isChild)
    ) {
      return (
        <OrderedList>
          <ListItem>
            <RichText
              richTextArray={block.numbered_list_item.rich_text}
            ></RichText>
          </ListItem>
          {block.children &&
            block.children.map((child) =>
              buildListDom(
                child,
                block.children.length > 1 ? block.type : child.type,
                true
              )
            )}
        </OrderedList>
      );
    } else if (block.type === 'numbered_list_item') {
      return (
        <>
          <ListItem>
            <RichText
              richTextArray={block.numbered_list_item.rich_text}
            ></RichText>
          </ListItem>
          {block.children &&
            block.children.map((child) =>
              buildListDom(
                child,
                block.children.length > 1 ? block.type : child.type,
                true
              )
            )}
        </>
      );
    } else if (block.type === 'bulleted_list_item') {
      return (
        <>
          <ListItem>
            <RichText
              richTextArray={block.bulleted_list_item.rich_text}
            ></RichText>
          </ListItem>
          {block.children &&
            block.children.map((child) =>
              buildListDom(
                child,
                block.children.length > 1 ? block.type : child.type,
                true
              )
            )}
        </>
      );
    }
  };

  return <>{buildListDom(blockObj, undefined)}</>;
};
