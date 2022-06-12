import { Client } from '@notionhq/client';
import { BlockObject, PageObject } from './types';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID as string;

export const getPosts = async (
  args: Omit<QueryDatabaseParameters, 'database_id'>
): Promise<PageObject[]> => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      ...args,
    });
    return response.results as PageObject[];
  } catch (e) {
    console.error(e);
  }
};

export const getPost = async (pageId: string): Promise<PageObject> => {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response as PageObject;
  } catch (e) {
    console.error(e);
  }
};

export const getBlocks = async (blockId: string): Promise<BlockObject[]> => {
  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
    });
    const results = response.results as BlockObject[];
    const blocks = results.map(async (block) => {
      if (block.has_children) {
        return { ...block, children: await getBlocks(block.id) };
      }
      return block;
    });
    return Promise.all(blocks).then((blocks) => blocks);
  } catch (e) {
    console.error(e);
  }
};
