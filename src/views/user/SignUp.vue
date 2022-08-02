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
		<div v-show="role.role" class="mt-3">
			<b-col cols="12">
				<h1 class="text-center mt-4">Register new {{ role.label }} with e-mail</h1>	
			</b-col>
			
			<p v-if="errorMessage" class="text-center text-danger">{{ errorMessage }}</p>	
			<p v-if="message" class="text-center text-success">{{ message }}</p>
			
			<b-form @submit.prevent="register" novalidate>
				<b-col cols="12" lg="8" class="mx-auto mt-2">
					<b-row>
						<b-col cols="3" class="mt-1 d-md-none d-sm-none d-none d-lg-block">
							<label for="form-input-username">Username:</label>
						</b-col>
						<b-col cols="12" lg="9">
							<b-input-group>
								<span class="input-group-text" id="username-addon"><font-awesome-icon class="ms-1" icon="fa-solid fa-user" /></span>
								<b-form-input
									id="form-input-username"
									v-model="user.username"
									class="shadow"
									type="text"
									aria-describedby="username-addon"
									placeholder="Insert your username"
									@change="$v.user.username.$touch()">
								</b-form-input>
							</b-input-group>
							<b-form-invalid-feedback :state="!$v.user.username.$error">
								{{ !$v.user.username.required ? 'Username is required' :
								!$v.user.username.minLength || 
								!$.user.username.maxLength ? 'Username must be between 4 and 20 characters' : '' }}
							</b-form-invalid-feedback>
						</b-col>
					</b-row>
					<b-row class="mt-1">
						<b-col cols="3" class="mt-1 d-md-none d-sm-none d-none d-lg-block">
							<label for="form-input-email">E-mail:</label>
						</b-col>
						<b-col cols="12" lg="9">
							<b-input-group>
								<span class="input-group-text" id="email-addon"><font-awesome-icon class="ms-1" icon="fa-solid fa-envelope" /></span>
								<b-form-input
									id="form-input-email"
									v-model="user.email"
									class="shadow"
									type="email"
									aria-describedby="email-addon"
									placeholder="Insert your e-mail"
									@change="$v.user.email.$touch()">
								</b-form-input>
							</b-input-group>
							<b-form-invalid-feedback :state="!$v.user.email.$error">
								{{ !$v.user.email.required ? 'An e-mail address is required' :
								!$v.user.email.email ? 'You must insert a valid e-mail' : '' }}
							</b-form-invalid-feedback>
						</b-col>
					</b-row>
					<b-row class="mt-1">
						<b-col cols="3" class="mt-1 d-md-none d-sm-none d-none d-lg-block">
							<label for="form-input-confirm-email">Confirm e-mail:</label>
						</b-col>
						<b-col cols="12" lg="9">
							<b-input-group>
								<span class="input-group-text" id="confirm-email-addon"><font-awesome-icon class="ms-1" icon="fa-regular fa-envelope" /></span>
								<b-form-input
									id="form-input-confirm-email"
									v-model="confirmEmail"
									class="shadow"
									type="email"
									aria-describedby="confirm-email-addon"
									placeholder="Confirm your e-mail"
									@change="$v.confirmEmail.$touch()">
								</b-form-input>
							</b-input-group>
							<b-form-invalid-feedback :state="!$v.confirmEmail.$error">
								{{ !$v.confirmEmail.required ? 'You must confirm your email' :
								!$v.confirmEmail.email ? 'You must insert a valid e-mail' :
								!$v.confirmEmail.sameAs ? 'E-mails do not coincide' : '' }}
							</b-form-invalid-feedback>
						</b-col>
					</b-row>
					<b-row class="mt-1">
						<b-col cols="3" class="mt-1 d-md-none d-sm-none d-none d-lg-block">
							<label for="form-input-password">Password</label>
						</b-col>
						<b-col cols="12" lg="9">
							<b-input-group>
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
						<b-col cols="3" class="mt-1 d-md-none d-sm-none d-none d-lg-block">
							<label for="form-confirm-password">Confirm password</label>
						</b-col>
						<b-col cols="12" lg="9">
							<b-input-group>
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
					<b-overlay :show="overlayShow" rounded spinner-small>
						<AppButton
							buttonType="submit"
							:class="disableButton">
							Register
						</AppButton>
					</b-overlay>
				</b-col>
			</b-form>
		</div>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import AppButton from '../../components/buttons/AppButton.vue'

export default {
	data() {
		return {
			user: {
				username: '',
				email: '',
				password: '',
				roles: []
			},
			confirmEmail: '',
			confirmPassword: '',
			message: '',
			errorMessage: '',
			disableButton: '',
			overlayShow: false,
			role: {
				label: '',
				role: ''
			},

			rolesButton: [
				{ label: 'I am a teacher.', variant: 'outline-primary', icon: 'fa-solid fa-chalkboard-teacher' },
				{ label: 'I am a student.', variant: 'outline-primary', icon: 'fa-solid fa-graduation-cap' }
			]
		}
	},
	components: {
		AppButton,
	},
	validations: {
		user: { 
			username: { 
				required,
				minlength: minLength(4),
				maxLength: maxLength(20)
			},
			email: { 
				required,
				email 
			},
			password: { 
				required,
				minlength: minLength(6),
				maxLength: maxLength(20)
			}
		},
		confirmEmail: { 
			required,
			email,
			sameAs: sameAs(function() {
				return this.user.email
			})
		},
		confirmPassword: { 
			required,
			sameAs: sameAs(function() {
				return this.user.password
			})	
		}
	},
	computed: {
		...mapGetters(['userIsSignedIn']),
	},
	mounted() {
		if(this.userIsSignedIn) {
			this.$router.push({ name: 'quiz-by-levels' })
		}
	},
	methods: {
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
		},
		register() {
			if(!this.$v.$invalid) {
			this.disableButton = 'disabled'
			this.overlayShow = true
			this.user.roles.push(this.role.role)
			this.$http.requestUserRegister(this.user)
			.then((response) => {
				this.registrationRequest = true
				this.errorMessage = ''
				this.message = 'A confirmation e-mail has been sent to ' + response.data.email + ". Check your inbox to complete registration."
				this.$v.$reset()
				this.disableButton = ''
				this.user.username = ''
				this.user.email = ''
				this.user.password = ''
				this.confirmEmail = ''
				this.confirmPassword = ''
				this.overlayShow = false
			})
			.catch((error) => {
				console.log(error.response)
				this.disableButton = ''
				if(error.response.status === 409) {
					this.message = ''
					this.errorMessage = 'This e-mail has already been used.'	
				} else {
					this.message = ''
					this.errorMessage = 'There was a problem. Please try again later'
				}
				this.overlayShow = false
			})
			} else {
				this.disableButton = ''
				this.$v.$touch()
			}
			
		}
	}
	
}
</script>

<style>

</style>