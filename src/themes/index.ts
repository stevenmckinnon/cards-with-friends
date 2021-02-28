import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const value = {
  color: {
    primary: "#367EFA",
    secondary: "#FA367E",
  },
};

const palette = {
  primary: {
    main: value.color.primary,
  },
  secondary: {
    main: value.color.secondary,
  },
};

const themeOverrides: any = {
  overrides: {
    MuiAppBar: {
      root: {
        backgroundColor: "#ffffff",
        boxShadow: "none",
        borderBottom: "solid 1px rgba(0, 0, 0, 0.15)",
      },
    },
  },
};

export const lightTheme = responsiveFontSizes(
  createMuiTheme({ palette: { ...palette, type: "light" }, ...themeOverrides })
);
export const darkTheme = responsiveFontSizes(
  createMuiTheme({ palette: { ...palette, type: "dark" }, ...themeOverrides })
);
