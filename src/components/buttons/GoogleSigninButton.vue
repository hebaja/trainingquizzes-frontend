<template>
	<GoogleLogin class="btn btn-danger w-100" :params="params" :onSuccess="onSuccess" >
		<span><font-awesome-icon icon="fa-brands fa-google" class="fa-lg"  /></span>
			&nbsp;&nbsp;&nbsp;Continue with Google
	</GoogleLogin>
</template>

<script>

import GoogleLogin from 'vue-google-login'

export default {
	name: 'google-login-button',
	data() {
		return {
			params: {
				client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID
			},
		}
	},
	components: {
		GoogleLogin
	},
	methods: {
		onSuccess(googleUser) {
			console.log(googleUser)
			this.$store.dispatch('googleSignIn', googleUser)
			.then(() => {
				this.$emit('onSigninSuccess')
			})
			.catch((error) => {
				console.log(error)
				this.errorMessage = 'There was a problem. Please try again.'
			})
        },
	}
}
</script>

<style>

</style>