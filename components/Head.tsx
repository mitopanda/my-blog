import NextHead from 'next/head';
import { FC, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const Head: FC<Props> = ({ children }) => {
  return (
    <NextHead>
      <meta lang={'ja'} />
      <title>mishitoshi&apos;s blog</title>
      <meta
        name="description"
        content="技術的なことを書くつもりではいるブログ。"
      />
      {children}
    </NextHead>
  );
};
