import { PropsWithChildren, ReactElement } from "react";

export type LayoutProps = PropsWithChildren & {
  header: {
    icon: ReactElement;
    title: string;
  };
  loading?: boolean;
};
