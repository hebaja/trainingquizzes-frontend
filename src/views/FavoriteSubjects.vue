<template>
	<b-row class="mt-3">
		<b-col cols="12" >
			<AppSearch 
				:isFilteredByUser="true" 
				:isFavoriteSubjects="true"
				:userId="storedUser.id" 
				:inputLabel="'Search in ' + storedUser.username + '\'s favorite subjects'"
				/>
		</b-col>
		<b-overlay :show="overlayShow" rounded="sm" opacity="0.9" variant="transparent" blur="5px">
			<b-col cols="12" v-if="payload != ''">
				<Pagination title="Your latest favorite subjects:" :payload="payload" @shiftPage="shiftSubjectsPage">
					<SubjectItems :subjects="payload.content" @subjectItemClick="openSubject($event)" />
				</Pagination>
			</b-col>
		</b-overlay>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '../components/Pagination.vue'
import SubjectItems from '../components/lists/SubjectItems.vue'
import AppSearch from '../components/AppSearch.vue'

export default {
	name: 'favorite-subjects',
	data() {
		return {
			subjects: '',
			overlayShow: false,
			pageSize: 10,
			payload: ''
		}
	},
	components: {
		Pagination,
		SubjectItems,
		AppSearch
	},
	computed: {
		...mapGetters(['storedUser']),
		...mapGetters(['userIsTeacher'])
	},
	mounted() {
		const page = 0
		this.overlayShow = true
		this.requestSubjects(page)
    },
	methods: {
		requestSubjects(page) {
			this.overlayShow = true
			this.$http.getFavoriteSubjects(this.storedUser.id, page, this.pageSize, null)
			.then((response) => {
				this.payload = response.data
				this.overlayShow = false
			})
			.catch((error) => {
				console.log('Error', error.message);
				this.errorMessage = 'There was a problem. Please try again.'
				this.overlayShow = false
			})
		},
		shiftSubjectsPage(page) {
			this.overlayShow = true
			this.requestSubjects(page)
		},
		openSubject(subject) {
			this.$router.push({ name: 'subject-profile', params: { subject: subject } })
			this.$store.dispatch('defineUserAuthor', subject.user)
		}
	}
}
</script>

<style>

</style>