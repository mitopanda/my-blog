import type { FC } from 'react';
import { BlockObject, RichText as RichTextType } from '../lib/notion/types';
import { Text } from './Text';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import { RichText } from './RichText';
import { RenderBlock } from './RenderBlock';

type Props = {
  richTextArray: RichTextType[];
  toggleChildren?: BlockObject[];
};

export const Toggle: FC<Props> = ({ richTextArray, toggleChildren }) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <RichText richTextArray={richTextArray}></RichText>
          </AccordionButton>
        </h2>
        <AccordionPanel>
          {toggleChildren &&
            toggleChildren.map((child) => (
              <RenderBlock key={child.id} block={child}></RenderBlock>
            ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
