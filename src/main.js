import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import VTooltip from 'v-tooltip'
import CripNotice from 'crip-vue-notice'
import FBSignInButton from 'vue-facebook-signin-button'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import store from './store'
import http from './http'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { FontAwesomeCreator } from './utils/FontAwesomeUtil'
import AppButton from './components/buttons/AppButton.vue'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('AppButton', AppButton)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.use(VTooltip)
Vue.use(CripNotice)
Vue.use(FBSignInButton)
Vue.prototype.$http = http

const fontAwesomeUtil = new FontAwesomeCreator()
fontAwesomeUtil.buildIcons()

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
