const defaultColorPalette = {
  black: "#141414",
  frost: "#F4F8FF",
  darkerFrost: "#e6e9f7",
  gray: "#979CA0",
  green: "#3DA65A",
  red: "#a63d3d",
};

export const theme = {
  color: {
    text: {
      primary: defaultColorPalette.black,
      secondary: defaultColorPalette.frost,
      inactive: defaultColorPalette.gray,
      negative: defaultColorPalette.red,
    },
    layout: {
      background: {
        primary: defaultColorPalette.frost,
      },
    },
    interactive: {
      primary: defaultColorPalette.darkerFrost,
      positive: defaultColorPalette.green,
      danger: defaultColorPalette.red,
    },
    border: {
      inactive: defaultColorPalette.gray,
      active: defaultColorPalette.black,
    },
  },
  spacing: {
    xxxs: 4,
    xxs: 8,
    xs: 12,
    sml: 16,
    md: 24,
    lg: 32,
    xl: 40,
    xxl: 56,
  },
  fontSizes: {
    xs: 12,
    sml: 16,
    md: 20,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 1000,
  },
} as const;

export type Theme = typeof theme;
