<template>
	<b-row>
		<b-col cols="12" class="mt-4">
			<font-awesome-icon class="ms-1" icon="fa-solid fa-user" /> {{ user.username }}
		</b-col>
		<b-col cols="12">
			<font-awesome-icon class="ms-1" icon="fa-solid fa-at" /> {{ user.email }}
		</b-col>
		<p v-if="errorMessage" class="text-center text-danger">{{ errorMessage }}</p>
		<hr class="mt-2"/>
		<b-col cols="12" class="mx-auto d-none d-lg-block">
			<table class="table">
				<thead>
					<tr>
						<th>Subject</th>
						<th>Level</th>
						<th>Average</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="average in averages" :key="average.subjectTitle">
						<td>{{ average.subjectTitle }}</td>
						<td>{{ average.levelCapitalize }}</td>
						<td>
							<b-progress :max="100" height="1.8em"
							show-value>
								<b-progress-bar 
								:value="average.averageForMeter"
								:variant="
								average.averageForMeter <= 40 ? 'danger' :
								average.averageForMeter > 40 && average.averageForMeter < 80 ? 'warning' :
								'success'" 
								show-progress animated>
									<strong>
										<span id="average-text">{{ average.averageForMeter }}%</span>
									</strong>
								</b-progress-bar>
							</b-progress>
						</td>
					</tr>
				</tbody>
			</table>
		</b-col>
		<b-col cols="12" class="mx-auto d-md-block d-lg-none">
			<div v-for="average in averages" :key="average.subjectTitle" class="card mb-1 bg-light border-secondary shadow" style="height: 6.8em;">
				<div class="card-header">
					{{ average.subjectTitle }}
				</div>
				<div class="card-body">
					<h6 class="card-subtitle mb-1 text-muted">Level: {{ average.levelCapitalize }}</h6>
						<b-row>
							<b-col cols="3">
								Average:
							</b-col>
							<b-col cols="9" class="mt-1">
								<b-progress :max="100" height="1.8em"
									show-value>
										<b-progress-bar 
										:value="average.averageForMeter"
										:variant="
										average.averageForMeter <= 40 ? 'danger' :
										average.averageForMeter > 40 && average.averageForMeter < 80 ? 'warning' :
										'success'" 
										show-progress animated>
											<strong>
												<span id="average-text">{{ average.averageForMeter }}%</span>
											</strong>
										</b-progress-bar>
								</b-progress>
							</b-col>
						</b-row>
				</div>
			</div>
		</b-col>
		<b-col cols="8" class="mx-auto mt-4">
			<div>
				<AppButton
					buttonStyle="delete"
					@appButtonClick="$bvModal.show('modal-delete-account-request')">
					Delete my account
				</AppButton>
				<AppModal 
					:modalId="'modal-delete-account-request'" 
					:message="'Do you really want to delete your account'"
					@componentFunction="deleteAccountRequest"
					:confirmButtonLabel="'Delete'" >
				</AppModal>
				<AppModal 
					:modalId="'modal-delete-account-confirm'"
					:message="'Your data will be lost. This cannot be undone!'"
					@componentFunction="deleteAccount"
					:confirmButtonLabel="'Delete my account'">
				</AppModal>
			</div>
		</b-col>
	</b-row>
	
</template>

<script>
import { mapGetters } from 'vuex'
import AppModal from '../components/Modal.vue'
import AppButton from '../components/buttons/AppButton.vue'

export default {
	name: 'averages',
	data() {
		return {
			user: {},
			averages: {},
			errorMessage: '',
			disableButton: ''
		}
	},
	components: {
		AppModal,
		AppButton
	},
	computed: {
		...mapGetters(['storedUser']),
		...mapGetters(['userIsSignedIn']),
		barVariant() {
			return 'info'
		}
	},
	mounted() {
		if(this.storedUser) {
			this.user = this.storedUser
			this.$http.post('/api/averages', this.user)
			.then((response) => {
				this.errorMessage = ''
				this.averages = response.data
			})
			.catch((error) => console.log(error.response))
			this.messageError = 'Averages could not be retrieved. Please try again.'
		} else {
			this.messageError = 'Averages could not be loaded. Please try again.'
		}
	},
	methods: {
		deleteAccountRequest() {
			this.$bvModal.hide('modal-delete-account-request')
			this.$bvModal.show('modal-delete-account-confirm')
		},
		deleteAccount() {
			this.$bvModal.hide('modal-delete-account-confirm')
			this.disableButton = 'disabled'
			this.$http.post('/api/delete-user', this.user)
			.then((response) => {
				console.log(response)
				this.disableButton = ''
				this.$store.commit('SIGN_OUT_USER')
				this.$router.push({path: '/signin?user_deleted=done'})
			})
			.catch((error) => {
				console.log(error.response)
				this.errorMessage = 'There was a problem. User accounted was not deleted.'
				this.disableButton = ''
			})
		}
	}
}
</script>

<style>
#average-text {
	font-size: 1.3em;
}

</style>