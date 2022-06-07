import { Client } from '@notionhq/client';

export type MatchType<T, U, V = never> = T extends U ? T : V;
type ElementType<T> = T extends (infer U)[] ? U : never;
type PickType<T, K extends keyof T> = T[K] extends Record<string, infer U>
  ? U
  : never;

export type PageObject = MatchType<
  ElementType<Awaited<ReturnType<Client['databases']['query']>>['results']>,
  {
    properties: unknown;
  }
>;
export type Property = PickType<PageObject, 'properties'>;

export type BlockObject = MatchType<
  ElementType<
    Awaited<ReturnType<Client['blocks']['children']['list']>>['results']
  >,
  {
    type: unknown;
  }
> & {
  children?: BlockObject[];
};

export type RichText = ElementType<
  MatchType<BlockObject, { type: 'paragraph' }>['paragraph']['rich_text']
>;

export type Table = MatchType<BlockObject, { type: 'table' }>['table'];

export const appropriateProperty = <T extends Property['type']>(
  properties: PageObject['properties'],
  key: 'Tags' | 'Name' | 'CreatedAt',
  type: T
): MatchType<Property, { type: T }> => {
  const property = properties[key];
  return property.type === type
    ? (property as MatchType<Property, { type: T }>)
    : null;
};
