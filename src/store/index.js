import Vuex from 'vuex'
import Vue from 'vue'
import http from '@/http'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'

Vue.use(Vuex)

const state = {
    token: null,
    user: {},
    finalScoreObject: {},
    exercise: {},
}

const mutations = {
    DEFINE_SIGNED_IN_USER(state, { token, user }) {
        state.user = user,
        state.token = token
    },
    SIGN_OUT_USER(state) {
        state.token = null,
        state.user = {}
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
}

const actions = {
    signIn({ commit }, user) {
        return new Promise((resolve, reject) => {
            http.post('/api/auth', user)
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
    googleSignIn({ commit }, googleUser) {
        return new Promise((resolve, reject) => {
            http.post('/api/auth/google', googleUser.wc.id_token)
            .then((response) => {
                commit('DEFINE_SIGNED_IN_USER', {
                    token: googleUser.wc.id_token,
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
            http.post('/api/auth/facebook', facebookUser.accessToken)
            .then((response) => {
                commit('DEFINE_SIGNED_IN_USER', {
                    token: facebookUser.accessToken,
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
            exercise: exercise,
        })
    }
}

const getters = {
    userIsSignedIn: state => Boolean(state.token),
    userId: state => state.user.id,
    finalScoreObject: state => state.finalScoreObject,
    storedExercise: state => state.exercise,
    storedUser: state => state.user,
    userIsAdmin: state => {
        let result = false
		state.user.roles.filter(authority => {
			if(authority === 'ROLE_ADMIN') result = true
		})
        return result
    }
}

// const plugins = 
//     [
//         createPersistedState({
//           getState: (key) => Cookies.getJSON(key),
//           setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
//         })
//       ]


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
})