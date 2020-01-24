import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueTour from "vue-tour";
import VueLayers from "vuelayers";
import "vuelayers/lib/style.css"; 

require ("vue-tour/dist/vue-tour.css");

Vue.use(VueLayers, {
  dataProjection: "EPSG:4326"
});
Vue.use(VueTour);

import Axios from "axios";

Axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = "Bearer " + token;
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
Vue.use(Axios);
Vue.prototype.$http = Axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
