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
		</b-col>
		<b-col cols="12" lg="8" offset-lg="2">
			<b-collapse v-if="quest.subscribedUsers" id="collapse-show-subscribed-users" class="mt-2">
				<b-list-group v-if="quest.subscribedUsers.length > 0">
					<b-list-group-item href="#" v-for="subscribedUser in quest.subscribedUsers" :key="subscribedUser.id" @click="openSubscribedUser(subscribedUser.id)">
						<b-avatar 
							size="sm"
							class="me-2"
							:src="subscribedUser.pictureUrl ? subscribedUser.pictureUrl : 'https://cdn-icons-png.flaticon.com/512/64/64572.png'" />
							{{ subscribedUser.username }} ({{ subscribedUser.email }})
					</b-list-group-item>
				</b-list-group>
				<span v-else>There are no subscribed users</span>
			</b-collapse>
		</b-col>
	</div>
</template>

<script>
import AppButton from '../buttons/AppButton.vue'
export default {
	name: 'show-subscribed-users',
	props: ['quest'],
	components: { AppButton	}
}
</script>

<style>

</style>