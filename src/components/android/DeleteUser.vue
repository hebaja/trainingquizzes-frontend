<template>
	<b-row class="mt-4">
		<b-col cols="12" class="mx-auto">
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
		</b-col>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from '../buttons/AppButton.vue'
import AppModal from '../Modal.vue'

export default {
	name: 'delete-user',
	data() {
		return {
			user: {}
		}
	},
	computed: {
		...mapGetters(['storedUser']),
	},
	components: {
		AppButton,
		AppModal
	},
	mounted() {
		if(this.storedUser) {
			this.user = this.storedUser
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
				if(this.isMobile()) window.location.replace('my.special.scheme://details?id=user-removed')
				else this.$router.push({path: '/signin?user_deleted=done'})
			})
			.catch((error) => {
				console.log(error.response)
				this.errorMessage = 'There was a problem. User accounted was not deleted.'
				this.disableButton = ''
			})
		},
		isMobile() {
			if( screen.width <= 760 ) {
				return true;
			}
			else {
				return false;
			}
		}
	}
}
</script>

<style>

</style>