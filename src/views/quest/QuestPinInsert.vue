<template>
	<b-row class="mt-5">
		<b-col cols="8" class="mx-auto">
			<b-form @submit.prevent="subscribe" novalidate>
				<b-input-group class="mt-3">
					<b-form-input 
						v-model="$v.pin.$model"
						@change="$v.pin.$touch()"
						type="text" 
						placeholder="Enter quest pin"
						required>
					</b-form-input>
					<b-overlay 
						:show="overlayShow"
						rounded
						opacity="0.6"
						spinner-small
						spinner-variant="primary"
						class="d-inline-block">
						<b-button style="background-color: #ffa726;" type="submit">Subscribe</b-button>
					</b-overlay>
				</b-input-group>
				<span v-if="$v.pin.$error" class="text-danger">This field is required</span>
			</b-form>
			<p v-if="errorMessage" class="text-center text-danger">{{ errorMessage }}</p>
		</b-col>
	</b-row>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
	name: 'quest-pin-insert',
	data() {
		return {
			pin: '',
			disableButton: false,
			overlayShow: false,
			errorMessage: ''
		}
	},
	validations() {
		return {
			pin: { required }
		}
	},
	methods: {
		subscribe() {
			this.disableButton = true
			if(!this.$v.$invalid) {
				this.overlayShow = true
				this.$http.getQuestByPin(this.pin)
				.then((response) => {
					this.$router.push({ name: 'quest-subscribe', params: { receivedQuest: response.data }})
					this.disableButton = false
					this.overlayShow = false
					this.errorMessage = ''
				})
				.catch((error) => {
					console.log(error)
					this.errorMessage = 'Could not load quest'
					this.disableButton = false
					this.overlayShow = false
				})
			} else {
				this.$v.$touch()
			}
		}
	}
}
</script>

<style>

</style>