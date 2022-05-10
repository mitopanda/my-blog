import { Client } from '@notionhq/client';
import { PageObject } from './types';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// FIXME: 型どうするか考える
export const getPosts = async (): Promise<PageObject[]> => {
  const databaseId = process.env.NOTION_DATABASE_ID as string;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'Publish',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'CreatedAt',
        direction: 'descending',
      },
    ],
  });
  return response.results;
};
