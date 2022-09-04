<template>
	<div>
		<b-col cols="12" lg="8" offset-lg="2" class="mt-3">
			<AppButton
				v-b-toggle.collapse-show-subscribed-users>
					Show subscribed users
					<font-awesome-icon 
						class="ms-2" 
						icon="fa-solid fa-users" />
			</AppButton>
			<br>
		</b-col>
		<b-col cols="12" lg="8" offset-lg="2">
			<b-collapse v-if="subscribedUsers" id="collapse-show-subscribed-users" class="mt-2">
				<b-overlay :show="overlayShow" rounded="sm">
					<b-list-group v-if="subscribedUsers.length > 0">
						<b-list-group-item v-for="subscribedUser in subscribedUsers" :key="subscribedUser.id">
							<div class="d-flex w-100 justify-content-between">
								<span>
									<b-avatar 
										size="sm"
										class="me-2"
										:src="subscribedUser.pictureUrl ? subscribedUser.pictureUrl : 'https://cdn-icons-png.flaticon.com/512/64/64572.png'" />
										{{ subscribedUser.username }} ({{ subscribedUser.email }})
								</span>
								<span v-show="!questIsFinished">
									<font-awesome-icon
										class="text-danger"
										icon="fa-solid fa-trash" 
										@click.prevent="openRemoveUserModal(subscribedUser)"
										v-b-tooltip.hover title="Remove this user from quest"
										style="cursor: pointer;"
									/>
								</span>
							</div>
						</b-list-group-item>
					</b-list-group>
					<span v-else>There are no subscribed users</span>
				</b-overlay>
			</b-collapse>
			<Modal 
				:modalId="'modal-remove-user'"
				:message="'Do you really want to remove this user from quest?'"
				@componentFunction="removeUser"
				:confirmButtonLabel="'Remove'">
			</Modal>
		</b-col>
	</div>
</template>

<script>
import AppButton from '../buttons/AppButton.vue'
import Modal from '../Modal.vue'

export default {
	name: 'show-subscribed-users',
	props: {
		subscribedUsers: {
			type: Array,
			required: true
		},
		questId: {
			type: Number,
			required: true
		},
		questIsFinished: {
			type: Boolean,
			required: true
		}
	},
	components: { 
		AppButton,
		Modal
	},
	data() {
		return {
			userToBeRemoved: {},
			overlayShow: false,
		}
	},
	methods: {
		openRemoveUserModal(user) {
			this.userToBeRemoved = user
			this.$bvModal.show('modal-remove-user')
		},
		removeUser() {
			this.$bvModal.hide('modal-remove-user')
			this.overlayShow = true
			this.$http.unsubscribeUser(this.userToBeRemoved.id, this.questId)
			.then((response) => {
				this.overlayShow = false
				this.$emit('updateUsers', response.data)
			})
			.catch((error) => {
				console.log(error)
				this.$notice['error']({
					title: 'Error',
					description: 'User could not be removed. ' + error,
					styles: { top: "4em" }
				})	
				this.overlayShow = false
			})
		}
	}
}
</script>

<style>

</style>