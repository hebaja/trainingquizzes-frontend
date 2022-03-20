<template>
	<fb-signin-button
		:params="fbSignInParams"
		@success="onSignInSuccess"
		@error="onSignInError">
		<b-button class="w-100" style="background-color: #4267b2;">
			<font-awesome-icon icon="fa-brands fa-facebook" class="fa-lg" />&nbsp;&nbsp;&nbsp;Sign in with Facebook
		</b-button>
	</fb-signin-button>
</template>

<script>
/*global FB*/

export default {
	name: 'facebook-signin-button',
	data() {
		return {
			user: {
				email: '',
				password: ''
			},
			loginOptions: {
				scope: 'email'
			},
			scope: {},
			model: {},
			facebookUser: {
				user: this.user,
				accessToken: ''
			},
			fbSignInParams: {
				scope: 'email',
				return_scopes: true
			}
		}
	},
	mounted() {
		window.fbAsyncInit = function() {
		FB.init({
		appId      : process.env.VUE_APP_FACEBOOK_APP_ID,
		cookie     : true,  // enable cookies to allow the server to access the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.8' // use graph api version 2.8
		});
		};
		(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	},
	methods: {
		onSignInSuccess (response) {
			this.facebookUser.accessToken = response.authResponse.accessToken
			FB.api('/me', {fields: ['name','last_name', 'email']}, person => {
				this.user.email = person.email	
				this.$store.dispatch('facebookSignIn', this.facebookUser)
				.then(() => this.$emit('onSigninSuccess'))
				.catch((error) => {
					console.log(error)
					this.errorMessage = 'There was a problem. Please try again.'
				})
			})
		},
		onSignInError (error) {
			console.log('error', error)
		}
	}
}
</script>

<style>

</style>