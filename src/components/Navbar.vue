<template>
    <b-navbar toggleable="lg" style="background-color: #ffa726!important;">
        <b-navbar-brand class="ms-3" href="" to="/">
            <img class="d-none d-lg-block" src="../assets/logo.svg" alt="English Training Quizzes main logo" />
            <img class="d-sm-block d-lg-none" src="../assets/logo_reduced.svg" alt="English Training Quizzes main reduced logo">
        </b-navbar-brand>
        <b-nav-toggle  class="me-3" target="nav-collapse"><font-awesome-icon class="ms-1" icon="fa-solid fa-caret-down" /></b-nav-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav v-if="userIsSignedIn" class="ms-lg-auto ms-md-3 ms-sm-3 ms-3 me-3">
                <b-nav-item href="#" to="english_app">Play</b-nav-item>
                <b-nav-item href="#" to="averages">Averages</b-nav-item>
                <b-nav-item v-if="userIsAdmin" href="#" to="subject_list">Subjects</b-nav-item>
                <b-nav-item href="#" @click.prevent="signout">Sign out</b-nav-item>
                <b-nav-item href="#" to="about">About</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav v-else class="ms-lg-auto ms-md-3 ms-sm-3 ms-3 me-3">
                <b-nav-item href="#" to="english_app">Play</b-nav-item>
                <b-nav-item href="#" to="signin">Sign in</b-nav-item>
                <b-nav-item href="#" to="signup">Sign up</b-nav-item>
                <b-nav-item href="#" to="about">About</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>

</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: "navbar",
    methods: {
        signout() {
			this.$store.commit('SIGN_OUT_USER')
			this.$router.push({ name: 'signin' })
            window.sessionStorage.clear()
		}
    },
    computed: {
        ...mapGetters(['userIsSignedIn']),
        ...mapGetters(['userIsAdmin'])
    }

}
</script>

<style>

</style>