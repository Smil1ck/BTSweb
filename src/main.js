import { createApp } from "vue";
import { createPinia } from "pinia";
import { vuetify } from "/plugins/vuetify";

import App from "./App.vue";
import router from "./router";

// Vuetify
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

const app = createApp(App);

app.use(createPinia());
app.use(vuetify);
app.use(router);
app.mount("#app");
