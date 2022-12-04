import Vuex from 'vuex'
import Vue from 'vue'
import http from '@/http'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    token: null,
	userIsTeacher: false,
    userIsStudent: false,
    openQuestId: null,
    user: {},
    userAuthor: {},
    finalScoreObject: {},
    exercise: {},
    subscribeQuestId: null,
    editSubjectId: null
}

const mutations = {
    DEFINE_SIGNED_IN_USER(state, { token, user }) {
        state.user = user,
        state.token = token
    },
    UPDATE_STORED_USER(state, { user }) {
        state.user = user
    },
    UPDATE_STORED_USER_SUBJECTS(state, { subjects }) {
        state.user.subjects = []
        state.user.subjects = subjects
    },
    SIGN_OUT_USER(state) {
        state.token = null,
        state.user = {}
        state.userIsTeacher = false,
        state.userIsStudent = false
    },
    DEFINE_USER_AUTHOR(state, { user }) {
        state.userAuthor = user
    },
    RESET_USER_AUTHOR(state) {
        state.userAuthor = {}
    },
    DEFINE_FINAL_SCORE_OBJECT(state, { finalScoreObject }) {
        state.finalScoreObject = finalScoreObject
    },
    RESET_FINAL_SCORE_OBJECT(state) {
        state.finalScoreObject = {}
    },
    DEFINE_STORED_EXERCISE(state, { exercise }) {
        state.exercise = exercise
    },
    RESET_STORED_EXERCISE(state) {
        state.exercise = {}
    },
    UPDATE_FINAL_SCORE_OBJECT(state) {
        state.finalScoreObject.userId = state.user.id
    },
    DEFINE_SUBSCRIBE_QUEST_ID(state, questId) {
        state.subscribeQuestId = questId
    },
    DEFINE_EDIT_SUBJECT_ID(state, subjectId) {
        state.editSubjectId = subjectId
    },
    RESET_EDIT_SUBJECT_ID(state) {
        state.editSubjectId = null
    },
    RESET_SUBSCRIBE_QUEST_ID(state) {
        state.subscribeQuestId = null
    },
    DEFINE_USER_IS_TEACHER(state) {
        if(state.user.roles) {
            let isTeacher = false
            state.user.roles.filter(authority => {
                if(authority === 'ROLE_TEACHER') isTeacher = true
            })
            state.userIsTeacher = isTeacher
        }
    },
    DEFINE_USER_IS_STUDENT(state) {
        if(state.user.roles) {
            let isStudent = false
            state.user.roles.filter(authority => {
                if(authority === 'ROLE_STUDENT') isStudent = true
            })
            state.userIsStudent = isStudent
        }
    }
}

const actions = {
    signIn({ commit }, user) {
        return new Promise((resolve, reject) => {
            http.signin(user)
            .then((response) => {
                commit('DEFINE_SIGNED_IN_USER', {
					token: response.data.token,
					user: response.data.user
				})
                resolve(response.data)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    updateUser({ commit }, userForm) {
        return new Promise((resolve, reject) => {
            http.updateUserRoles(userForm)
            .then((response) => {
                commit('UPDATE_STORED_USER', {
                    user: response.data
                })
                commit('DEFINE_USER_IS_TEACHER')
                commit('DEFINE_USER_IS_STUDENT')
                resolve(response.data)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    updateUserProfile({ commit }, userId) {
        return new Promise((resolve, reject) => {
            http.getUser(userId)
            .then((response) => {
                commit('UPDATE_STORED_USER', {
                    user: response.data
                })
                commit('DEFINE_USER_IS_TEACHER')
                commit('DEFINE_USER_IS_STUDENT')
                resolve(response.data)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },

    updateUserSubjects({ commit }, subject) {
        return new Promise((resolve, reject) => {
            http.updateSubjects(subject)
            .then((response) => {
                commit('UPDATE_STORED_USER_SUBJECTS', {
                    subjects: response.data
                })
                resolve(response.data)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
        })
    },
    getUserSubjects({ commit }, userId) {
        return new Promise((resolve, reject) => {
            http.getSubjects(userId)
            .then((response) => {
                commit('UPDATE_STORED_USER_SUBJECTS', {
                    subjects: response.data
                })
                resolve(response.data)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
        })
    },
    googleSignIn({ commit }, googleObject) {
        return new Promise((resolve, reject) => {
            http.authenticateGoogleUser(googleObject)
            .then((response) => {
                commit('DEFINE_SIGNED_IN_USER', {
                    token: googleObject.idToken,
                    user: response.data
                })
                resolve(response.data)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
	facebookSignIn({ commit }, facebookUser) {
		return new Promise((resolve, reject) => {
			http.authenticateFacebookUser(facebookUser)
			.then((response) => {
				commit('DEFINE_SIGNED_IN_USER', {
					token: facebookUser.token,
					user: response.data
				})
				resolve(response.data)
			})
			.catch(error => {
				console.log(error)
                reject(error)
			})
		})
	},
    createFinalResultObject({ commit }, finalScoreObject) {
        commit('DEFINE_FINAL_SCORE_OBJECT', {
            finalScoreObject: finalScoreObject
        })
    },
    storeExercise({ commit }, exercise) {
        commit('DEFINE_STORED_EXERCISE', {
            exercise: exercise
        })
    },
    defineUserAuthor({ commit }, user) {
        commit('DEFINE_USER_AUTHOR', {
            user: user
        })
    },
}

const getters = {
    userIsSignedIn: state => Boolean(state.token),
    userId: state => state.user.id,
    finalScoreObject: state => state.finalScoreObject,
    storedExercise: state => state.exercise,
    storedUser: state => state.user,
	userIsTeacher: state => state.userIsTeacher,
    userIsStudent: state => state.userIsStudent,
    userHasSingleRole: state => state.user.roles ? state.user.roles.length === 1 : true,
    storedUserAuthor: state => state.userAuthor,
    storedSubscribeQuestId: state => state.subscribeQuestId,
    storedEditSubjectId: state => state.editSubjectId
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
})