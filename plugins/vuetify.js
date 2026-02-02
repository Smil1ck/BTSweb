import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

const lightGrayTheme = {
  dark: false,
  colors: {
    // Основные цвета
    primary: "#4a6572", // Серо-синий
    "primary-darken-1": "#344955",
    "primary-lighten-1": "#5d7988",

    // Фоновые цвета
    background: "#e0e0e0", // Светло-серый фон
    surface: "#ffffff", // Белая поверхность для карточек

    // Системные цвета
    error: "#ef5350",
    info: "#2196f3",
    success: "#4caf50",
    warning: "#ff9800",

    // Дополнительные нейтральные цвета
    "gray-50": "#fafafa",
    "gray-100": "#f5f5f5",
    "gray-200": "#eeeeee",
    "gray-300": "#e0e0e0",
    "gray-400": "#bdbdbd",
    "gray-500": "#9e9e9e",
    "gray-600": "#757575",
    "gray-700": "#616161",
    "gray-800": "#424242",
    "gray-900": "#212121",

    // Акцентные оттенки
    accent: "#82b1ff",
    "on-primary": "#ffffff",
    "on-secondary": "#000000",
    "on-background": "#263238",
    "on-surface": "#263238",
  },
};

const darkGrayTheme = {
  dark: true,
  colors: {
    primary: "#78909c",
    background: "#121212",
    surface: "#1e1e1e",
    error: "#cf6679",
    info: "#64b5f6",
    success: "#81c784",
    warning: "#ffb74d",
  },
};
export const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
  theme: {
    defaultTheme: "light",
    //
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "lightGrayTheme",
    themes: {
      lightGrayTheme,
      darkGrayTheme,
    },
    variations: {
      colors: ["primary", "error", "info", "success", "warning"],
      lighten: 1,
      darken: 1,
    },
  },
});
