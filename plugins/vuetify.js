import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
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
  variables: {
    // Кастомизация CSS переменных
    "border-color": "rgba(0, 0, 0, 0.12)",
    "border-opacity": 0.12,
    "high-emphasis-opacity": 0.87,
    "medium-emphasis-opacity": 0.6,
    "disabled-opacity": 0.38,
    "idle-opacity": 0.04,
    "hover-opacity": 0.04,
    "focus-opacity": 0.12,
    "selected-opacity": 0.08,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,

    // Тени
    "shadow-key-umbra-opacity": "rgba(0, 0, 0, 0.1)",
    "shadow-key-penumbra-opacity": "rgba(0, 0, 0, 0.07)",
    "shadow-key-ambient-opacity": "rgba(0, 0, 0, 0.06)",

    // Закругления
    "border-radius-root": "8px",
    "border-radius-sm": "4px",
    "border-radius-lg": "12px",
    "border-radius-xl": "16px",

    // Отступы
    "spacing-xs": "4px",
    "spacing-sm": "8px",
    "spacing-md": "16px",
    "spacing-lg": "24px",
    "spacing-xl": "32px",
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
