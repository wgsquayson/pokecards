import { PropsWithChildren } from "react";

export type ProgressCircleProps = PropsWithChildren & {
  progress: number;
  startAnimation: boolean;
};
