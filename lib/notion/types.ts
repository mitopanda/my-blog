import { ElementType } from 'react';
import { Client } from '@notionhq/client';

type MatchType<T, U, V = never> = T extends U ? T : V;

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
