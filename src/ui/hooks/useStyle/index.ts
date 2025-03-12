import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { theme, Theme } from "../../theme";
import { useMemo } from "react";

type Styles = ViewStyle | TextStyle | ImageStyle;
type StyleSheetShape = Record<string, Styles | Styles[]>;

export default function useStyle<const T extends StyleSheetShape>(
  callback: (theme: Theme) => T
): T & { theme: Theme } {
  return useMemo(() => ({ ...callback(theme), theme }), [callback]);
}
