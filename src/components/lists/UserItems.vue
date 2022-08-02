<template>
	<b-overlay :show="overlayShow" rounded="sm">
		<b-list-group>
			<b-list-group-item href="#" v-for="user in users" :key="user.id" @click.prevent="open(user)">
				<div class="d-flex align-items-start">
					<b-avatar class="mt-1" size="lg" :src="user.pictureUrl ? user.pictureUrl : 'https://cdn-icons-png.flaticon.com/512/64/64572.png'" />
					<b-row>
						<b-col cols="12">
							<h5 class="ms-3 mt-1">{{ user.username }}</h5>
						</b-col>
						<b-col cols="12">
							<small class="ms-3">
								{{ user.email }}
							</small>
						</b-col>
					</b-row>
				</div>
			</b-list-group-item>
		</b-list-group>
	</b-overlay>
</template>

<script>
export default {
	name: 'user-items',
	props: { 
		users: Array, 
		overlayShow: Boolean
	},
	methods: {
		open(user) {
			this.$router.push({ name: 'quiz-by-levels',  params: { userAuthor: user } })
		}
	}
}
</script>

<style>

</style>