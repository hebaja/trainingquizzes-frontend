<template>
	<b-row>
		<b-col cols="12">
			<h1 class="text-center mt-4">Reset your password</h1>	
		</b-col>

		<p v-if="message" class="text-center text-success">{{ message }}</p>
		<p v-if="errorMessage" class="text-center text-danger">{{ errorMessage }}</p>

		<b-form @submit.prevent="resetPasswordRequest" novalidate>
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
								type="text"
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
			<b-col cols="12" lg="8" class="mx-auto mt-4">
				<b-overlay :show="overlayShow" rounded spinner-small>
					<AppButton
						buttonType="submit"
						:class="disableButton">
						Send reset password request
					</AppButton>
				</b-overlay>
			</b-col>
		</b-form>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import AppButton from '../../components/buttons/AppButton.vue'

export default {
    name: 'reset-password-request',
    data() {
        return {
			user: {
				email: '',
			},
			boool: true,
			errorMessage: '',
			message: '',
			disableButton: '',
			overlayShow: false
        }
    },
	components: {
		AppButton
	},
	validations: {
		user: {
			email: {
				required,
				email
			}
		}
	},
	computed: {
		...mapGetters(['userIsSignedIn'])
	},
    mounted() {
		if(this.userIsSignedIn) {
			this.$router.push({ name: 'quiz-by-levels'})
		}
	},
	methods: {
		resetPasswordRequest() {
			this.disableButton = 'disabled'
			this.overlayShow = true
			if(!this.$v.$invalid) {
				this.$http.requestPasswordReset(this.user)
				.then((response) => {
					this.errorMessage = ''
					this.message = 'An e-mail has been sent to ' + response.data.email + '. Check your inbox to reset your password.'
					this.disableButton = ''
					this.overlayShow = false
					this.user = {}
				})
				.catch((error) => {
					console.log(error.response)
					this.disableButton = ''
					if(error.response.status === 404) {
						this.message = ''
						this.errorMessage = 'This e-mail has not been registered yet'	
					} else {
						this.message = ''
						this.errorMessage = 'Invalid e-mail'
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