import App from './app'
import Components from '~components'

/* eslint no-undef: "off" */
Vue.use(Components)
export default new Vue({
  el: '#app',
  ...App
})
