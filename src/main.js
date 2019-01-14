// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import './assets/scss/custom.scss';

window.axios = require('axios');

import Vue from 'vue'
import App from './App'
import AppServer from './AppServer'
require('bootstrap')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
      App
  },
  template: '<App/>'
})
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: {
//       AppServer
//   },
//   template: '<AppServer/>'
// })
