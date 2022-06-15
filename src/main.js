import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import VTooltip from 'v-tooltip'
import CripNotice from 'crip-vue-notice'
import FBSignInButton from 'vue-facebook-signin-button'

import router from '@/router'
import store from '@/store'
import http from '@/http'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope as fasEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope as farEnvelope} from '@fortawesome/free-regular-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons'
import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faCheckCircle, 
  faTimesCircle, 
  faSave, 
  faAt, 
  faLock, 
  faUnlock, 
  faUser,
  faUsers,
  fasEnvelope, 
  farEnvelope, 
  faCaretDown, 
  faPencil, 
  faTrash, 
  faBook,
  faBookOpen,
  faTrashAlt,
  faPlus,
  faArrowLeft, 
  faGoogle,
  faFacebook, 
  faArrowRight,
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faMagnifyingGlass,
  faChalkboardTeacher,
  faGraduationCap,
  faHourglassStart,
  faHourglassEnd)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.use(VTooltip)
Vue.use(CripNotice)
Vue.use(FBSignInButton)

Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
