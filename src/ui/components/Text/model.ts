import { TextProps as RNTextProps, TextStyle } from "react-native";

export type TextVariant =
  | "default"
  | "bold"
  | "heading"
  | "highlight"
  | "detail";

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  color?: string;
  textAlign?: TextStyle["textAlign"];
};
