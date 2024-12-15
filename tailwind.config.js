const options = require("./config");

const allPlugins = {
  typography: require("@tailwindcss/typography"),
  forms: require("@tailwindcss/forms"),
  containerQueries: require("@tailwindcss/container-queries"),
};

const plugins = Object.keys(allPlugins)
  .filter((k) => options.plugins[k])
  .map((k) => {
    if (k in options.plugins && options.plugins[k]) {
      return allPlugins[k];
    }
  });

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  darkMode: "dark",
  theme: {
    screens: {
      md: "768px",
      xl: "1366px",
    },
    fontSize: {
      h2: [
        "5.4rem",
        {
          fontWeight: "bold",
          lineHeight: "1.2em",
          letterSpacing: "0.02em",
        },
      ],
      sub1: [
        "4.2rem",
        {
          fontWeight: "bold",
          lineHeight: "normal",
          letterSpacing: "0.01em",
        },
      ],
      h3desk: [
        "4.8rem",
        {
          fontWeight: "bold",
          lineHeight: "normal",
          letterSpacing: "0.02em",
        },
      ],
      h3: [
        "2.8rem",
        {
          fontWeight: "bold",
          lineHeight: "normal",
          letterSpacing: "0.02em",
        },
      ],
      sub2: [
        "2.8rem",
        {
          fontWeight: "bold",
          lineHeight: "normal",
          letterSpacing: "0.01em",
        },
      ],
      msub2: [
        "2rem",
        {
          fontWeight: "bold",
          lineHeight: "normal",
          letterSpacing: "0.01em",
        },
      ],
      body1: ["2.4rem", "1.5em"],
      body2: [
        "2rem",
        {
          lineHeight: "1.5em",
          fontWeight: "bold",
        },
      ],
      body3: [
        "2rem",
        {
          lineHeight: "1.5em",
          fontWeight: "normal",
        },
      ],
      body4: ["1.8rem", "1.45em"],
      body5: ["1.6rem", "1.4375em"],
      body6: ["1.4rem", "1.4em"],
      body7: [
        "1.6rem",
        {
          lineHeight: "1.45em",
          fontWeight: "bold",
        },
      ],
      body8: [
        "1.2rem",
        {
          lineHeight: "1.4em",
        },
      ],
      listTitle: ["1.6rem", "1.4em"],
      error: [
        "1.4rem",
        {
          fontWeight: 400,
          lineHeight: "1.4em",
        },
      ],
    },
    colors: {
      transparent: "transparent",
      text1: "#162148",
      text2: "#29386F",
      greyBlue: "#606EA3",
      line: "#B0BAF0",
      blue: "#CDD5F4",
      lightBlue: "#F9FAFF",
      white: "#FFFFFF",
      stroke: "rgba(188, 1, 25, 0.2)",
      pink: "#FFEFF1",
      errorColor: "#D92F45",
      red: "#BC0119",
      redFocused: "#960013",
      bullets: {
        level1: "#E1E5F9",
        level2: "#F4F6FF",
        level3: "#FDFDFF",
        txt2: "#DEE2F0",
        txt3: "#F0F3FB",
      },
    },
    container: {
      center: true,
      width: {
        DEFAULT: "2rem",
        md: "4rem",
        xl: "8rem",
      },
      padding: {
        DEFAULT: "2rem",
        md: "4rem",
        xl: "8rem",
      },
    },
    extend: {},
  },
  plugins: plugins,
};
