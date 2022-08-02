<template>
	<b-row>
		<b-col cols="12">
			<h1 class="text-center mt-4">Input your new password</h1>	
		</b-col>

		<p v-if="errorMessage" class="text-center text-danger">{{ errorMessage }}</p>

		<b-form @submit.prevent="resetPassword" novalidate>
			<b-col cols="12" lg="8" class="mx-auto mt-2">
				<b-row>
					<b-col cols="3" class="d-md-none d-sm-none d-none d-lg-block">
						<label for="form-input-username">Username:</label>
					</b-col>
					<b-col cols="12" lg="9">
						<b-input-group>
							<span class="input-group-text" id="username-addon"><font-awesome-icon class="ms-1" icon="fa-solid fa-user" /></span>
							<b-form-input
								id="form-input-username"
								v-model="receivedUsername"
								class="shadow"
								type="text"
								disabled
								aria-describedby="username-addon">
							</b-form-input>
						</b-input-group>
					</b-col>
				</b-row>
				<b-row class="mt-1">
					<b-col cols="3" class="d-md-none d-sm-none d-none d-lg-block">
						<label for="form-input-email">E-mail:</label>
					</b-col>
					<b-col cols="12" lg="9">
						<b-input-group>
							<span class="input-group-text" id="email-addon"><font-awesome-icon class="ms-1" icon="fa-solid fa-envelope" /></span>
							<b-form-input
								id="form-input-email"
								v-model="receivedEmail"
								class="shadow"
								type="email"
								disabled
								aria-describedby="email-addon">
							</b-form-input>
						</b-input-group>
					</b-col>
				</b-row>
				<b-row class="mt-1">
					<b-col cols="3" class="d-md-none d-sm-none d-none d-lg-block">
						<label for="form-input-password">Password</label>
					</b-col>
					<b-col cols="12" lg="9">
						<b-input-group class="mb-2 mr-sm-2 mb-sm-0">
							<span class="input-group-text" id="password-addon"><font-awesome-icon class="ms-1" icon="fa-solid fa-lock" /></span>
							<b-form-input 
								id="form-input-password"
								v-model="user.password"
								class="shadow"
								type="password"
								aria-describedby="password-addon"
								placeholder="Insert your password"
								@change="$v.user.password.$touch()">
							</b-form-input>
						</b-input-group>
						<b-form-invalid-feedback :state="!$v.user.password.$error">
							{{ !$v.user.password.required ? 'You must insert a password' :
							!$v.user.password.minLength || 
							!$v.user.password.maxLength ? 'Password must be between 6 and 20 characters' : '' }}
						</b-form-invalid-feedback>
					</b-col>
				</b-row>
				<b-row class="mt-1">
					<b-col cols="3" class="d-md-none d-sm-none d-none d-lg-block">
						<label for="form-confirm-password">Confirm paswword</label>
					</b-col>
					<b-col cols="12" lg="9">
						<b-input-group class="mb-2 mr-sm-2 mb-sm-0">
							<span class="input-group-text" id="confirm-password-addon"><font-awesome-icon class="ms-1" icon="fa-solid fa-unlock" /></span>
							<b-form-input 
								id="form-confirm-password"
								v-model="confirmPassword"
								class="shadow"
								type="password"
								aria-describedby="confirm-password-addon"
								placeholder="Confirm your password"
								@change="$v.confirmPassword.$touch()">
							</b-form-input>
						</b-input-group>
						<b-form-invalid-feedback :state="!$v.confirmPassword.$error">
							{{ !$v.confirmPassword.required ? 'You must confirm your password' : 
							!$v.confirmPassword.sameAs ? 'Passwords do not coincide' : '' }}
						</b-form-invalid-feedback>
					</b-col>
				</b-row>
			</b-col>
			<b-col cols="12" lg="8" class="mx-auto mt-4">
				<AppButton
					:class="disableButton"
					buttonType="submit">
					Reset you password
				</AppButton>
			</b-col>
		</b-form>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex' 
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import AppButton from '../../components/buttons/AppButton.vue'
export default {
	name: 'reset_password',
	data() {
		return {
			user: {
				username: '',
				email: '',
				password: ''
			},
			resetPasswordToken: {
				token: '',
				password: ''
			},
			confirmPassword: '',
			errorMessage: '',
			disableButton: ''
		}
	},
	components: {
		AppButton
	},
	mounted() {
		if(this.userIsSignedIn) {
			this.$router.push({ name: 'quiz-by-level' })
		}
		if(this.$route.query.reset_token) {
			this.resetPasswordToken.token = this.$route.query.reset_token
			this.$http.validatePasswordResetToken(this.resetPasswordToken)
			.then((response) => {
				this.user = response.data
			})
			.catch((error) => {
				console.log(error)
				this.errorMessage = 'There was a problem. Please try again later.'
			})
		} else {
			this.$router.push({ name: 'signin' })
		}
	},
	computed: {
		...mapGetters(['userIsSignedIn']),
		receivedUsername() {
			return this.user.username
		},
		receivedEmail() {
			return this.user.email
		}
	},
	methods: {
		resetPassword() {
			this.disableButton = 'disabled'
			if(!this.$v.$invalid) {
				this.resetPasswordToken.password = this.user.password
				this.$http.resetPassword(this.resetPasswordToken)
				.then((response) => {
					console.log(response.status)
					this.disableButton = ''
					if(this.isMobile()) window.location.replace('my.special.scheme://details?id=password-reset')
					else {
						this.$notice['success']({
							title: 'Success',
							description: 'Password was successfully changed.',
							styles: { top: "4em" }
						})
						this.$router.push({ name: 'signin' }) 
					} 
				})
				.catch((error) => {
					console.log(error)
					this.disableButton = ''
					this.errorMessage = 'There was a problem. Please try again later.'
				})
			} else {
				this.disableButton = ''
				this.$v.$touch()
			}
		},
		isMobile() {
			if( screen.width <= 760 ) {
				return true;
			}
			else {
				return false;
			}
		}
	},
	validations: {
		user: { 
			password: { 
				required,
				minlength: minLength(6),
				maxLength: maxLength(20)
			}
		},
		confirmPassword: { 
			required,
			sameAs: sameAs(function() {
				return this.user.password
			})	
		}
	},
}
</script>

<style>

</style>