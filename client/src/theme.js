export const tokens = {
  grey: {
    100: "#f0f0f3",
    200: "#e1e2e7",
    300: "#d1d3da",
    400: "#c2c5ce",
    500: "#b3b6c2",
    600: "#8f929b",
    700: "#6b6d74",
    800: "#48494e",
    900: "#242427",
  },
  primary: {
    // light green
    100: "#d0fcf4",
    200: "#a0f9e9",
    300: "#71f5de",
    400: "#41f2d3",
    500: "#12efc8",
    600: "#0ebfa0",
    700: "#0b8f78",
    800: "#076050",
    900: "#043028",
  },
  secondary: {
    // yellow
    100: "#fcf0dd",
    200: "#fae1bb",
    300: "#f7d299",
    400: "#f5c377",
    500: "#f2b455",
    600: "#c29044",
    700: "#916c33",
    800: "#614822",
    900: "#302411",
  },
  tertiary: {
    // purple
    500: "#8884d8",
  },
  background: {
    light: "#2d2d34",
    main: "#1f2026",
  },
};

// mui theme settings
export const themeSettings = {
  palette: {
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
    },
    text: {
      primary: tokens.grey[100],
      secondary: tokens.grey[300],
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    color: tokens.grey[500],
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: tokens.grey[200],
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 16,
      fontWeight: 600,
      color: tokens.grey[300],
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 400,
      color: tokens.grey[300],
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      color: tokens.grey[500],
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': { // underline in its normal state
            borderBottomColor: tokens.grey[100], // light grey
          },
          '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottomColor: '#ffffff', // white when hovered
          },
          '&:after': { // underline when active
            borderBottomColor: '#e0e0e0', // a slightly different shade of grey when focused
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& $notchedOutline': {
            borderColor: tokens.grey[100], // light grey for the border in its normal state
          },
          '&:hover $notchedOutline': {
            borderColor: '#ffffff', // white when the input is hovered
          },
          '&$focused $notchedOutline': {
            borderColor: '#e0e0e0', // a slightly different shade of grey when the input is focused
          },
        },
      },
    },
  },
};