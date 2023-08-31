import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./plugins";

import VueSweetalert2 from "vue-sweetalert2";
import VueApexCharts from "vue3-apexcharts";
import BootstrapVue3 from "bootstrap-vue-3";
import "sweetalert2/dist/sweetalert2.min.css";
import "leaflet/dist/leaflet.css";

import fontawsome from "./utilities/fontawsome";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import GlobalComponent from "./utilities/_globals";
import progressBar from "./utilities/progress-bar";
import "nprogress/nprogress.css";
//import { VueQueryPlugin } from "@tanstack/vue-query";

import setupInterceptors from "@/Services/setupInterceptors";
setupInterceptors(store);

progressBar(router);

// Vuetify
//import 'vuetify/styles'
//import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
//import * as directives from 'vuetify/directives'

//const vuetify = createVuetify({
// components,
//directives,
//})

const app = createApp(App);
app.use(VueSweetalert2);
app.use(BootstrapVue3);
app.use(VueApexCharts);
app.use(fontawsome);
app.use(GlobalComponent);
// app.use(VueQueryPlugin);
app.use(Vue3Toasity, {
  autoClose: 3000,
  limit: 3,
  position: "bottom-center",
  theme: "colored",
  rtl: true,
});
//app.use(vuetify);
app.use(store).use(router).mount("#app");
app.mixin({
  data() {
    return {
      breadcrumb: true,
    };
  },
});
// Global Components
app.component("iq-card", require("./components/custom/cards/iq-card").default);
app.component("loader", require("./components/custom/loader/Loader").default);
app.component("alert", require("./components/bootstrap/alert/alert").default);
app.component(
  "carousel",
  require("./components/bootstrap/carousel/carousel").default
);
app.component(
  "carouselItems",
  require("./components/bootstrap/carousel/carouselItems").default
);
app.component("toast", require("./components/bootstrap/toasts/toast").default);
app.component(
  "toast-header",
  require("./components/bootstrap/toasts/toast-header").default
);
app.component(
  "toast-body",
  require("./components/bootstrap/toasts/toast-body").default
);
app.component(
  "progressbar",
  require("./components/bootstrap/Progressbar/progressbar").default
);
app.component(
  "popover",
  require("./components/bootstrap/popover/popover").default
);
app.component(
  "tooltip",
  require("./components/bootstrap/tooltip/tooltip").default
);
// app.component('Lottie', require('./components/socialapp/lottie/Lottie').default)
app.component("tab-nav", require("./components/bootstrap/tab/tab-nav").default);
app.component(
  "tab-nav-items",
  require("./components/bootstrap/tab/tab-nav-items").default
);
app.component(
  "tab-content",
  require("./components/bootstrap/tab/tab-content").default
);
app.component(
  "tab-content-item",
  require("./components/bootstrap/tab/tab-content-item").default
);
app.component(
  "TimeLine",
  require("./components/custom/timeline/TimeLine").default
);
app.component(
  "dropdown",
  require("./components/bootstrap/dropdown/dropdown").default
);
app.component(
  "dropdown-items",
  require("./components/bootstrap/dropdown/dropdown-items").default
);
app.component(
  "collapse",
  require("./components/bootstrap/collapse/collapse").default
);
app.component(
  "collapse-content",
  require("./components/bootstrap/collapse/collapse-content").default
);
app.component("modal", require("./components/bootstrap/modal/modal").default);
app.component(
  "model-header",
  require("./components/bootstrap/modal/model-header").default
);
app.component(
  "model-body",
  require("./components/bootstrap/modal/model-body").default
);
app.component(
  "model-footer",
  require("./components/bootstrap/modal/model-footer").default
);
app.component(
  "offcanvas",
  require("./components/bootstrap/offcanvas/offcanvas").default
);
app.component(
  "offcanvas-header",
  require("./components/bootstrap/offcanvas/offcanvas-header").default
);
app.component(
  "offcanvas-body",
  require("./components/bootstrap/offcanvas/offcanvas-body").default
);
export { app };
