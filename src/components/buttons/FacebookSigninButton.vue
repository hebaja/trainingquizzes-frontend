<template>
	<b-button class="w-100" style="background-color: #4267b2;"
		@click="signin">
		<font-awesome-icon icon="fa-brands fa-facebook" class="fa-lg" />&nbsp;&nbsp;&nbsp;{{ label }}
	</b-button>
</template>

<script>
/*global FB*/

export default {
	name: 'facebook-signin-button',
	data() {
		return {
			facebookUser: {
				uid: '',
				username: '',
				email: '',
				token: '',
				pictureUrl: '',
				roles: []
			}
		}
	},
	props: ['label', 'role'],
	mounted() {
		window.fbAsyncInit = function() {
		FB.init({
		appId      : process.env.VUE_APP_FACEBOOK_APP_ID,
		cookie     : true,
		xfbml      : true,
		version    : 'v9.0'
		});
		
		FB.AppEvents.logPageView();   
		
		};

		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	},
	methods: {
		signin() {
		window.FB.login(response => {
			FB.api('/me', {fields:['name','first_name', 'last_name', 'email', 'id', 'picture']}, person => {
				this.facebookUser.uid = person.id
				this.facebookUser.username = person.first_name
				this.facebookUser.email = person.email
				this.facebookUser.token = response.authResponse.accessToken
				this.facebookUser.pictureUrl = person.picture.data.url
				this.facebookUser.roles.push(this.role)

				this.$store.dispatch('facebookSignIn', this.facebookUser)
					.then(() => this.$emit('onSigninSuccess'))
					.catch((error) => {
						console.log(error)
						this.errorMessage = 'There was a problem. Please try again.'
					})
				})
			})
		}
	}
}
</script>

<style>

</style>