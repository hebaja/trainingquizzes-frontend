import axios from 'axios'
import store from './store'

let url

function isMobile() {
	if( screen.width <= 760 ) {
		return true;
	}
	else {
		return false;
	}
}

if(process.env.NODE_ENV === 'production') url = 'https://trainingquizzes.com:8443'
else if(isMobile()) url = 'http://192.168.1.100:8080'
else url = 'http://localhost:8080'

// url = 'http://192.168.122.2:8080'
// url = 'https://trainingquizzes.com'

const http = axios.create({
	baseURL: url,
	headers: {
		'Accept': 'application/json',
		'Content': 'application/json'
	}
})

http.interceptors.request.use(function(config) {
	const token = store.state.token
	if(token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
}, function(error) {
	return Promise.reject(error)
})

export default {
	signin(user) {
		return http.post('/api/auth', user)
	},
	getUser(userId) {
		return http.get('/api/user', { params: { userId: userId }})
	},
	updateUserRoles(user) {
		return http.post('/api/user/update-roles', user)
	},
	authenticateGoogleUser(googleUser) {
		return http.post('/api/auth/google', googleUser)
	},
	authenticateFacebookUser(facebookUser) {
		return http.post('/api/auth/facebook', facebookUser)
	},
	deleteUser(userId) {
		return http.delete('/api/user', { params: { userId: userId } })
	},

	getSubjects(userId) {
		return http.get('/api/subject/teacher', { params: { id: userId } })
	},
	getReducedSubjects(page, size, sort, query, userId) {
		return http.get('/api/subject/reduced-list', { params:{ query: query, page: page, size: size, sort: sort, userId: userId }})
	},
	updateSubjects(subject) {
		return http.put('/api/subject', subject)
	},
	deleteSubject(subjectId) {
		return http.delete('/api/subject/', { params: { subjectId: subjectId } })
	},
	getSubjectsByUserAndLevel(userAuthorId, page, size, level) {
		return http.get('/api/subject/user', { params: { userId: userAuthorId, page: page, size: size, sort: 'creationDate,desc', level: level }})
	},
	getRegularQuiz(subjectId) {
		return http.get('/api/task', { params: { subjectId: subjectId }})
	},

	getQuest(questId, userId) {
		return http.get('/api/quest', { params: { questId: questId, userId: userId }})
	},
	getQuestByPin(pin) {
		return http.get('/api/quest/pin', { params: { pin: pin }})
	},
	getCreatedQuests(userId, page, size) {
		return http.get('/api/quest/created-quests', { params: { userId: userId, page: page, size: size,  sort: 'startDate,desc' }})
	},
	getSubscribedQuests(userId, page, size) {
		return http.get('/api/quest/subscribed-quests', { params: { userId: userId, page: page, size: size, sort: 'startDate,desc' }})
	},
	registerQuest(quest) {
		return http.put('/api/quest', quest)
	},
	subscribeToQuest(subscribeQuest) {
		return http.post('/api/quest/subscribe', subscribeQuest)
	},
	deleteQuest(questId) {
		return http.delete('/api/quest/' + questId)
	},
	finishQuest(questId) {
		return http.get('/api/quest/finish', { params: { questId: questId }})
	},
	unsubscribeUser(userId, questId) {
		return http.get('/api/quest/unsubscribe-user', { params: { userId: userId, questId: questId }})
	},

	getTasksBySubject(subjectId) {
		return http.get('/api/task', { params: { subjectId: subjectId }})
	},

	openTrial(trial) {
		return http.post('/api/trial/open', trial)
	},
	updateTrial(trial) {
		return http.post('/api/trial/update', trial)
	},

	getTeachers(page, size, query) {
		return http.get('/api/user/teachers', { params: { page, size, query }})
	},
	saveResult(finalScore) {
		return http.post('/api/exercise/save', finalScore)
	},
	fetchAverages(user) {
		return http.post('/api/averages', user)
	},
	requestPasswordReset(user) {
		return http.post('/api/reset-password/request', user)
	},
	validatePasswordResetToken(resetPasswordToken) {
		return http.post('/api/reset-password/validate-token', resetPasswordToken)
	},
	resetPassword(resetPasswordToken) {
		return http.post('/api/reset-password', resetPasswordToken)
	},
	requestUserRegister(user) {
		return http.post('/api/user-register', user)
	},
	confirmUserRegister(userRegisterToken) {
		return http.post('/api/user-register/confirm', userRegisterToken)
	}
}