import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue } from 'bootstrap-vue'
import '@fortawesome/fontawesome-pro/scss/fontawesome.scss'
import '@fortawesome/fontawesome-pro/scss/solid.scss'
import '@fortawesome/fontawesome-pro/scss/brands.scss'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false;

// Install BootstrapVue
Vue.use(BootstrapVue);

Vue.use(VueAnalytics, {
  id() {
    return `UA-166891781-1`;
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app');
