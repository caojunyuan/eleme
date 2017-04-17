// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router/index.js';
import VueResource from 'vue-resource';
import App from './App';
import './common/stylus/index.styl';

Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
// document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
