<template>
	<GoogleLogin class="btn btn-danger w-100" :params="params" :onSuccess="onSuccess" >
		<span><font-awesome-icon icon="fa-brands fa-google" class="fa-lg"  /></span>
			&nbsp;&nbsp;&nbsp;{{ label }}
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
			googleObject: {
				idToken: '',
				roles: []
			}
		}
	},
	props:['label','role'],
	components: {
		GoogleLogin
	},
	methods: {
		onSuccess(googleUser) {
			this.googleObject.idToken = googleUser.getAuthResponse().id_token
			this.googleObject.roles.push(this.role)

			this.$store.dispatch('googleSignIn', this.googleObject)
			.then(() => {
				this.$emit('onSigninSuccess')
			})
			.catch((error) => {
				console.log(error)
				this.errorMessage = 'There was a problem. Please try again.'
			})
		},
		tryAuth() {
			this.$GoogleAuth.then(auth2 => {
				console.log(auth2.isSignedIn.get());
				console.log(auth2.currentUser.get())
			})
		}
	}
}
</script>

<style>

</style>