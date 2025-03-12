import { PropsWithChildren } from "react";

export type LayoutProps = PropsWithChildren & {
  header?: {
    title: string;
  };
  loading?: boolean;
};
