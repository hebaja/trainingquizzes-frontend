<template>
	<b-row class="mt-4">
		<b-col cols="12" class="d-flex justify-content-center">
			<b-avatar
				size="lg"
				href="#"
				to="profile"
				:src="storedUser.pictureUrl ? storedUser.pictureUrl : 'https://icones.pro/wp-content/uploads/2022/02/services-parametres-et-icone-d-engrenage-jaune.png'" />
		</b-col>
		<b-col cols="12">
			<h5 class="text-center">{{ storedUser.username }}</h5>
		</b-col>
		<b-col cols="12">
			<p class="text-center">{{ storedUser.email }}</p>
		</b-col>
		<b-col cols="12" v-if="errorMessage">
			<p class="text-danger text-center">{{ errorMessage }}</p>
		</b-col>
		<b-col cols="12" v-if="$v.optionsSelected.$error">
			<p class="text-danger text-center">User must have one profile at least</p>
		</b-col>
		<b-col cols="12" v-else-if="message">
			<p class="text-success text-center">{{ message }}</p>
		</b-col>
		<b-col cols="10" lg="8" xl="6" offset="1" offset-lg="2" offset-xl="3">
		<b-card header="User profiles" class="text-center" bg-variant="light">
			<b-form @submit.prevent="update">
				<b-col cols="12" class="d-flex justify-content-center">
					<b-form-group>
						<b-form-checkbox
							v-for="option in options"
							v-model="$v.optionsSelected.$model"
							:key="option.value"
							:value="option.value"
							@change="$v.optionsSelected.$touch()">
								&nbsp;{{ option.text }}
						</b-form-checkbox>
					</b-form-group>
				</b-col>
				<b-col cols="8" offset="2" class="mt-3">
					<AppButton
						:disabled="!optionsSelectedChanged"
						buttonType="Update profile">
						Update user
					</AppButton>
				</b-col>
			</b-form>
		</b-card>
		</b-col>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import AppButton from './buttons/AppButton.vue'
export default {
	name: 'profile',
	data() {
		return {
			optionsSelected: [],
			message: '',
			errorMessage: '',
			options: [
				{ text: 'Teacher', value: 'ROLE_TEACHER' },
				{ text: 'Student', value: 'ROLE_STUDENT' }
			]
		}
	},
	components: {
		AppButton
	},
	mounted() {
		this.storedUser.roles.forEach(role => {
			this.optionsSelected.push(role)
		})
	},
	computed: {
		...mapGetters(['storedUser']),
		optionsSelectedChanged() {
			if(this.$v.optionsSelected.$error) return !this.$v.optionsSelected.$error
			else if(!this.$v.optionsSelected.$dirty) return this.$v.optionsSelected.$dirty
			return true
		}
	},
	validations: {
		optionsSelected: { required }
	},
	methods: {
		update() {
			if(!this.$v.$invalid) {
				this.errorMessage = ''
				let userForm = {
					id: this.storedUser.id,
					username: this.storedUser.username,
					email: this.storedUser.email,
					roles: this.optionsSelected
				}
				this.$store.dispatch('updateUser', userForm)
				.then((response) => {
					console.log(response)
					this.$v.$reset()
					this.message = 'User profile updated. You may lose access to previous data.'
					this.$router.push('/')
				})
				.catch((error) => {
					console.log(error)
					this.errorMessage = 'There was an error. Please try again.'
					this.message = ''
				})
			} else {
				this.$v.$touch()
				this.message = ''
			}
		}
	}
}
</script>

<style>

</style>