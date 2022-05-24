import { Client } from '@notionhq/client';
import { PageObject } from './types';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export const getPosts = async (
  args: Omit<QueryDatabaseParameters, 'database_id'>
): Promise<PageObject[] | never> => {
  const databaseId = process.env.NOTION_DATABASE_ID as string;
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
