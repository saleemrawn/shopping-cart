const theme = {
  fonts: {
    main: `Inter, sans-serif`,
  },

  weights: {
    light: 300,
    regular: 400,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  headings: {
    desktop: {
      hero: "4rem",
      h1: "2.986rem",
      h2: "2.488rem",
      h3: "2.074rem",
      h4: "1.728rem",
      h5: "1.44rem",
      h6: "1.2rem",
    },

    mobile: {
      hero: "2rem",
      h1: "1.476rem",
      h2: "1.383rem",
      h3: "1.296rem",
      h4: "1.215rem",
      h5: "1.138rem",
      h6: "1.067rem",
    },
  },

  colours: {
    lavender: "#cecdfa",
    sapphire: "#1e2d65",
    chambray: "#34558c",
    grey50: "#FAFAFA",
    grey100: "#F5F5F5",
    grey200: "#EEEEEE",
    grey300: "#E0E0E0",
    grey400: "#BDBDBD",
    grey500: "#9E9E9E",
    grey600: "#757575",
    grey700: "#616161",
    grey800: "#424242",
    grey900: "#212121",
    white: "#ffffff",
  },

  spacing: {
    space2: "0.125rem",
    space4: "0.25rem",
    space8: "0.5rem",
    space12: "0.75rem",
    space16: "1rem",
    space24: "1.5rem",
    space32: "2rem",
    space40: "2.5rem",
    space48: "3rem",
    space64: "4rem",
    space80: "5rem",
    space96: "6rem",
    space160: "10rem",
  },

  breakpoints: {
    xs: "0", // X-Small devices (portrait phones, less than 576px)
    sm: "576px", // Small devices (landscape phones, 576px and up)
    md: "768px", // Medium devices (tablets, 768px and up)
    lg: "992px", // Large devices (desktops, 992px and up)
    xl: "1200px", // X-Large devices (large desktops, 1200px and up)
    xxl: "1400px", // XX-Large devices (larger desktops, 1400px and up)
  },
};

export default theme;
