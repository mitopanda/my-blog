import { ElementType } from 'react';
import { Client } from '@notionhq/client';

export type MatchType<T, U, V = never> = T extends U ? T : V;
type PickType<T, K extends keyof T> = T[K];

export type PageObject = MatchType<
  ElementType<Awaited<ReturnType<Client['databases']['query']>>['results']>,
  {
    properties: unknown;
  }
>;

export type BlockObject = MatchType<
  ElementType<
    Awaited<ReturnType<Client['blocks']['children']['list']>>['results']
  >,
  {
    type: unknown;
  }
>;

export type Property = PickType<PageObject, 'properties'>;

export const typedProperty = <T extends Property['type']>(
  properties: PageObject['properties'],
  key: 'Tags' | 'Name' | 'CreatedAt',
  type: T
): MatchType<PickType<Property, typeof key>, { type: T }> | null => {
  const property = properties[key];
  return property.type === type
    ? (property[type] as MatchType<PickType<Property, typeof key>, { type: T }>)
    : null;
};
