import { FC } from 'react';
import { BlockObject } from '../lib/notion/types';
import {
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { RichText } from './RichText';
import { Table as TableType } from '../lib/notion/types';

type Props = {
  table: TableType;
  childrenBlocks: BlockObject[];
};

export const Table: FC<Props> = ({ table, childrenBlocks }) => {
  const [header, ...body] = childrenBlocks;

  if (header.type !== 'table_row') {
    return null;
  }

  return (
    <TableContainer>
      <ChakraTable>
        <Thead>
          <Tr>
            {header.table_row.cells.map((cells, i) => (
              <Th key={i}>
                <RichText richTextArray={cells}></RichText>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {body.map((block) => (
            <TableRow key={block.id} block={block} />
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
};

const TableRow: FC<{ block: BlockObject }> = ({ block }) => {
  if (block.type !== 'table_row') {
    return null;
  }

  return (
    <Tr>
      {block.table_row.cells.map((cells, i) => (
        <Td key={i}>
          <RichText richTextArray={cells}></RichText>
        </Td>
      ))}
    </Tr>
  );
};
