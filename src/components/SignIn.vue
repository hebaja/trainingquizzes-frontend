<template>
	<b-row>
		<b-col cols="12" class="mt-5">
			<b-button-group size="lg" class="shadow col-12">
				<b-button 
				v-for="(roleButton, index) in rolesButton" :key="index"
				:variant="roleButton.variant"
				@click="setRole(index)">
					{{ roleButton.label }}
					<font-awesome-icon class="ms-1" :icon="roleButton.icon" />
				</b-button>
			</b-button-group>
		</b-col>
		<div v-show="role.role" class="mt-4">
			<b-col cols="12" lg="8" class="mx-auto mt-3 mt-sm-2">
				<GoolgeSigninButton :label="googleButtonLabel" :role="role.role" @onSigninSuccess="redirectUser" />
			</b-col>
			<b-col cols="12" lg="8" class="mx-auto mt-2">
				<b-col cols="12" lg="12" class="mt-2">
					<FacebookSigninButton :label="facebookButtonLabel" :role="role.role" @onSigninSuccess="redirectUser"/>
				</b-col>
			</b-col>
			<b-col cols="12" lg="8" class="mx-auto mt-2">
				<hr class="d-none d-sm-block"/>
			</b-col>
			<b-col cols="12" class="mt-2 mt-sm-0" >
				<h1 class="text-center fs-5">Sign in as a {{ role.label }} with your e-mail account</h1>	
			</b-col>
			
			<p v-if="message" class="text-center text-success">{{ message }}</p>
			<p v-if="errorMessage" class="text-center text-danger">{{ errorMessage }}</p>
			
			<b-form @submit.prevent="authenticate" novalidate>
				<b-col cols="12" lg="8" class="mx-auto mt-2">
					<b-row>
						<b-col cols="2" class="mt-1 d-md-none d-sm-none d-none d-lg-block">
							<label for="form-input-email">E-mail:</label>
						</b-col>
						<b-col cols="12" lg="10">
							<b-input-group>
								<span class="input-group-text" id="email-addon"><font-awesome-icon class="ms-1" icon="fa-solid fa-at" /></span>
								<b-form-input
									id="form-input-email"
									v-model="user.email"
									class="shadow"
									type="email"
									aria-describedby="email-addon"
									placeholder="Insert your e-mail">
								</b-form-input>
							</b-input-group>
							<b-form-invalid-feedback :state="!$v.user.email.$error">
								{{ !$v.user.email.required ? 'An e-mail address is required' :
								!$v.user.email.email ? 'You must insert a valid e-mail' : '' }}
							</b-form-invalid-feedback>
						</b-col>
					</b-row>
				</b-col>
				<b-col cols="12" lg="8" class="mx-auto mt-1">
					<b-row>
						<b-col cols="2" class="mt-1 d-md-none d-sm-none d-none d-lg-block">
							<label for="form-input-password">Paswword</label>
						</b-col>
						<b-col cols="12" lg="10">
							<b-input-group class="mb-2 mr-sm-2 mb-sm-0">
								<span class="input-group-text" id="password-addon"><font-awesome-icon class="ms-1" icon="fa-solid fa-lock" /></span>
								<b-form-input 
									id="form-input-password"
									v-model="user.password"
									class="shadow"
									type="password"
									aria-describedby="password-addon"
									placeholder="Insert your password">
								</b-form-input>
							</b-input-group>
							<b-form-invalid-feedback :state="!$v.user.password.$error">
								{{ !$v.user.password.required ? 'You must insert a password' :
								!$v.user.password.minLength || 
								!$v.user.password.maxLength ? 'Password must be between 6 and 20 characters' : '' }}
							</b-form-invalid-feedback>
						</b-col>
					</b-row>
				</b-col>
				<b-col cols="12" lg="8"  class="mx-auto mt-2">
					<AppButton
						buttonType="submit">
						Sign in
					</AppButton>
				</b-col>
			</b-form>
			<b-col cols="12" class="text-center mt-3">
				<router-link to="signup" style="font-weight: bold; text-decoration: none;">If you want to create an e-mail account, click here.</router-link>
			</b-col>
			<b-col cols="12" class="text-center mt-1">
				<router-link to="forgot_password" style="font-weight: bold; text-decoration: none;">If you forgot your password, click here.</router-link>
			</b-col>
		</div>
		
	</b-row>
</template>

<script>

import { mapGetters } from 'vuex'
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import AppButton from './buttons/AppButton.vue'
import GoolgeSigninButton from './buttons/GoogleSigninButton.vue'
import FacebookSigninButton from './buttons/FacebookSigninButton.vue'

export default {
	name: "login",
	data() {
		return {
			user: {
				email: '',
				password: ''
			},
			registerToken: {
				token: ''
			},
			newUser: {},
			message: '',
			errorMessage: '',
			renderParams: {
				width: 300,
				height: 50,
				longtitle: false
			},
			role: {
				label: '',
				role: ''
			},
			rolesButton: [
				{label: 'I am a teacher.', variant: 'outline-primary', icon: 'fa-solid fa-chalkboard-teacher'},
				{label: 'I am a student.', variant: 'outline-primary', icon: 'fa-solid fa-graduation-cap'}
			]
		}
	},
	components: {
		GoolgeSigninButton,
		FacebookSigninButton,
		AppButton
	},
	validations: {
		user: {
			email: {
				required,
				email
			},
			password: {
				required,
				minlength: minLength(6),
				maxLength: maxLength(20)
			}
		}
	},
	computed: {
		...mapGetters(['userIsSignedIn']),
		...mapGetters(['finalScoreObject']),
		googleButtonLabel() {
			return 'Continue with Google as a ' + this.role.label
		},
		facebookButtonLabel() {
			return 'Continue with Facebook as a ' + this.role.label
		}
	},
	mounted() {
		if(this.userIsSignedIn) {
			this.$router.push({path: '/english_app'})
		}
		if(this.$route.query.reset_password && this.$route.query.reset_password == 'done') {
			this.message = 'Your password has been changed. You can sign in now.'
		}
		if(this.$route.query.user_deleted && this.$route.query.user_deleted == 'done') {
			this.message = 'Your user account has been deleted.'
		}
		if(this.$route.query.register_token) {
			this.registerToken.token = this.$route.query.register_token
			this.$http.post('/api/user-register/confirm', this.registerToken)
			.then((response) => {
				if(this.isMobile()) window.location.replace('my.special.scheme://details?id=user-register')
				else this.message = response.data.username + ' has been registered. You can sign in now'
				this.errorMessage = ''
			})
			.catch((error) => {
				console.log(error)
				this.message = ''
				this.errorMessage = 'There was a problem and the user has not been registered'
			})
		}
	},
	methods: {
		authenticate() {
			if(!this.$v.$invalid) {
				this.$store.dispatch('signIn', this.user)
				.then(() => {
						this.redirectUser()
					})
				.catch((error) => {
					if(error.request.status === 401) {
						this.errorMessage = 'Invalid email or password.'
					}
				})
			} else {
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
		},
		setRole(index) {
			if(index === 0) {
				this.role.role = 'ROLE_TEACHER',
				this.role.label = 'teacher'
			} else {
				this.role.role = 'ROLE_STUDENT',
				this.role.label = 'student'
			}
			this.rolesButton.forEach(role => role.variant = 'outline-primary')
			this.rolesButton[index].variant = 'primary'
		},
		redirectUser() {
			this.$router.push(this.$route.query.redirect || '/')
			this.errorMessage = ''
			if(Object.keys(this.finalScoreObject).length !== 0) {
				this.$store.commit('UPDATE_FINAL_SCORE_OBJECT')
			}
			this.$store.commit('DEFINE_USER_IS_TEACHER')
			this.$store.commit('DEFINE_USER_IS_STUDENT')
		},
	}
}
</script>

<style>

</style>