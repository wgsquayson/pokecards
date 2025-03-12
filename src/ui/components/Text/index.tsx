import { Text as RNText } from "react-native";

import { TextProps } from "./model";
import { useStyle } from "../../hooks";

function Text({
  variant = "default",
  color = "#141414",
  children,
  ...props
}: TextProps) {
  const styles = useStyle((theme) => ({
    default: {
      color,
      fontSize: theme.fontSizes.sml,
      lineHeight: theme.fontSizes.sml * 1.5,
    },
    bold: {
      color,
      fontSize: theme.fontSizes.sml,
      fontWeight: 700,
    },
    heading: {
      color,
      fontSize: theme.fontSizes.xxl,
      fontWeight: 900,
    },
    highlight: {
      color,
      fontSize: theme.fontSizes.md,
      fontWeight: 700,
    },
    detail: {
      color,
      fontSize: theme.fontSizes.xs,
      fontWeight: 500,
    },
  }));

  return (
    <RNText {...props} style={[styles[variant]]}>
      {children}
    </RNText>
  );
}

export default Text;
