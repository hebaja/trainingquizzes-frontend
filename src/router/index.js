import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Index from '../components/Index'
import EnglishApp from '../components/EnglishApp'
import Signin from '../components/SignIn'
import Signup from '../components/SignUp'
import About from '../components/About'
import Averages from '../components/Averages'
import FinalScore from '../components/FinalScore'
import ForgotPassword from '../components/ForgotPassword'
import ResetPassword from '../components/ResetPassword'
import SubjectList from '../components/SubjectList'
import DeleteUser from '../components/android/DeleteUser'

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "index",
		component: Index,
		meta: {
			public: true
		}
	},
	{
		path: "/english_app",
		name: "english_app",
		component: EnglishApp,
		meta: {
			public: true
		}
	},
	{
		path: "/signin",
		name: "signin",
		component: Signin,
		meta: {
			public: true
		}
	},
	{
		path: "/signup",
		name: "signup",
		component: Signup,
		meta: {
			public: true
		}
	},
	{
		path: "/about",
		name: "about",
		component: About,
		meta: {
			public: true
		}
	},
	{
		path: "/averages",
		name: "averages",
		component: Averages
	},
	{
		path: "/final_score",
		name: "final_score",
		component: FinalScore
	},
	{
		path: "/forgot_password",
		name: "forgot_password",
		component: ForgotPassword,
		meta: {
			public: true
		}
	},
	{
		path: "/reset_password",
		name: "reset_password",
		component: ResetPassword,
		meta: {
			public: true
		}
	},
	{
		path: "/subject_list",
		name: "subject_list",
		component: SubjectList,
	},
	{
		path: "/android/delete_user",
		name: "android_delete_register",
		component: DeleteUser,
	}
]

const router = new VueRouter({
	routes
})

router.beforeEach((routeTo, routeFrom, next) => {
	if(!routeTo.meta.public && !store.state.token) {
		next({ path: '/signin', query: { redirect: routeTo.fullPath }})
	} else {
		next()
	}
})

export default router