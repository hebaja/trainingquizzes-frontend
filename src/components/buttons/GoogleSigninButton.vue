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
		}
	},
	props:['label','role'],
	components: {
		GoogleLogin
	},
	methods: {
		onSuccess(googleUser) {
			console.log(googleUser)
			let googleObject = {
				idToken: googleUser.zc.id_token,
				role: this.role
			}
			this.$store.dispatch('googleSignIn', googleObject)
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