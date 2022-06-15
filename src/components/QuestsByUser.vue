<template>
	<b-row class="mt-2">
		<Pagination title="Quests" :payload="payload" :overlayShow="overlayShow">
			<QuestItems :quests="payload.content"/>
		</Pagination>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from './shared/AppPagination.vue'
import QuestItems from './shared/QuestItems.vue'
export default {
	name: 'quests-by-user',
	data() {
		return {
			payload: '',
			overlayShow: false
		}
	},
	components: {
		Pagination,
		QuestItems
	},
	computed: {
		...mapGetters(['storedUser'])
	},
	mounted() {
		this.overlayShow = true
		this.$http.get('/api/quest/user', { params: { userId: this.storedUser.id }})
		.then((response) => {
			console.log(response.data)
			this.payload = response.data
			this.overlayShow = false
		})
		.catch((error) => {
			console.log(error)
			this.overlayShow = false
		})
	}
	
}
</script>

<style>

</style>