<template>
	<b-row>
		<b-overlay :show="overlayShow" rounded="sm" opacity="0.9" variant="transparent" blur="5px">
			<b-col cols="12" class="mt-4">
				<font-awesome-icon class="ms-1" icon="fa-solid fa-user" /> {{ storedUser.username }}
			</b-col>
			<b-col cols="12">
				<font-awesome-icon class="ms-1" icon="fa-solid fa-at" /> {{ storedUser.email }}
			</b-col>
			<p v-if="errorMessage" class="text-center text-danger">{{ errorMessage }}</p>
			<hr class="mt-2"/>
			<b-col v-if="payload" cols="12">
				<Pagination :payload="payload" @shiftPage="shiftAveragesPage">
					<AverageItems :averages="payload.content" />
				</Pagination>
			</b-col>
		</b-overlay>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '../../components/Pagination.vue'
import AverageItems from '../../components/lists/AverageItems.vue'

export default {
	name: 'averages',
	data() {
		return {
			user: {},
			payload: null,
			errorMessage: '',
			disableButton: '',
			pageSize: 10,
			overlayShow: false
		}
	},
	components: {
		Pagination,
		AverageItems
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
			this.overlayShow = true
			const page = 0
			this.requestAverages(page, this.pageSize)
		} else {
			this.messageError = 'Averages could not be loaded. Please try again.'
		}
	},
	methods: {
		requestAverages(page, pageSize) {
			this.$http.fetchAverages(this.storedUser.id, page, pageSize)
			.then((response) => {
				this.errorMessage = ''
				this.payload = response.data
				this.overlayShow = false
			})
			.catch((error) => {
				console.log(error.response)
				this.messageError = 'Averages could not be retrieved. Please try again.'
				this.overlayShow = false
			})
		},
		shiftAveragesPage(page) {
			this.overlayShow = true
			this.requestAverages(page, this.pageSize)
		}
	}
}
</script>

<style>
#average-text {
	font-size: 1.3em;
}

</style>