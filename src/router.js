import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Index from './views/Index'
import Signin from './views/user/SignIn'
import Signup from './views/user/SignUp'
import About from './views/About'
import FinalScore from './views/quiz/FinalScore'
import Averages from './views/quiz/Averages'
import ResetPasswordRequest from './views/user/ResetPasswordRequest'
import ResetPassword from './views/user/ResetPassword'
import DeleteUser from './views/user/DeleteUser'
import Profile from './views/user/Profile'
import Subjects from './views/Subjects'
import QuizByLevels from './views/quiz/QuizByLevels'
import RegularQuiz from './views/quiz/RegularQuiz'
import TrialQuiz from './views/quiz/TrialQuiz'
import QuestsByUser from './views/quest/QuestsByUser'
import Quest from './views/quest/Quest'
import SubscribeToQuest from './views/quest/SubscribeToQuest'
import SubscribedQuest from './views/quest/SubscribedQuest'
import AndroidRedirect from './views/user/AndroidRedirect'
import QuestSubscribeFilter from './views/quest/QuestSubscribeFilter'

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
		path: "/quiz-by-levels",
		name: "quiz-by-levels",
		component: QuizByLevels,
		meta: {
			public: true
		},
		props: true
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
		path: "/final-score",
		name: "final-score",
		component: FinalScore,
		props: true
	},
	{
		path: "/profile",
		name: "profile",
		component: Profile
	},
	{
		path: "/quests",
		name: "quests-by-user",
		component: QuestsByUser
	},
	{
		path: "/quest",
		name: "quest",
		component: Quest,
		props: true
	},
	{
		path: "/subscribed-quest",
		name: "subscribed-quest",
		component: SubscribedQuest,
		props: true
	},
	{
		path: "/quest-subscribe",
		name: "quest-subscribe",
		component: SubscribeToQuest,
		props: true
	},
	{
		path: "/reset-password-request",
		name: "reset-password-request",
		component: ResetPasswordRequest,
		meta: {
			public: true
		}
	},
	{
		path: "/reset-password",
		name: "reset-password",
		component: ResetPassword,
		meta: {
			public: true
		}
	},
	{
		path: "/subjects",
		name: "subjects",
		component: Subjects,
	},
	{
		path: "/delete-user",
		name: "delete-user",
		component: DeleteUser,
	},
	{
		path: "/regular-quiz",
		name: "regular-quiz",
		component: RegularQuiz,
		props: true,
		meta: {
			public: true
		}
	},
	{
		path: "/trial-quiz",
		name: "trial-quiz",
		component: TrialQuiz,
		props: true
	},
	{
		path: "/android-redirect",
		name: "android-redirect",
		component: AndroidRedirect,
		meta: {
			public: true
		}
	},
	{
		path: "/quest-subscribe-filter",
		name: "quest-subscribe-filter",
		component: QuestSubscribeFilter,
		meta: {
			public: true
		}
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