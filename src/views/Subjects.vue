<template>
	<b-row class="mt-3">
		<b-col cols="12" >
			<AppSearch 
				:isFilteredByUser="true" 
				:userId="storedUser.id" 
				:inputLabel="'Search in ' + storedUser.username + '\'s subjects'"
				/>
		</b-col>
		<b-overlay :show="overlayShow" rounded="sm" opacity="0.9" variant="transparent" blur="5px">
			<b-col cols="12" v-if="payload != ''">
				<Pagination title="Your latest subjects:" :payload="payload" @shiftPage="shiftSubjectsPage">
					<SubjectItems :subjects="payload.content" @subjectItemClick="openSubject($event)" />
				</Pagination>
			</b-col>
			<b-col cols="12" lg="8"  class="mx-auto mt-2">
				<AppButton 
					@appButtonClick="addSubject">
					Add subject
				</AppButton>
			</b-col>
		</b-overlay>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from '../components/buttons/AppButton.vue'
import { MobileUtil } from '../utils/MobileUtil'
import Pagination from '../components/Pagination.vue'
import SubjectItems from '../components/lists/SubjectItems.vue'
import AppSearch from '../components/AppSearch.vue'

const mobileUtil = new MobileUtil()

export default {
    name: 'subjects',
    data() {
        return {
            subjects: '',
			subject: {},
			subjectToBeRemovedId: null,
			overlayShow: false,
			mobileUtil: mobileUtil,
			pageSize: 10,

			payload: ''
        }
    },
	components: {
		AppButton,
		Pagination,
		SubjectItems,
		AppSearch
	},
	computed: {
		...mapGetters(['storedUser'])
	},
    mounted() {
		const page = 0
		this.overlayShow = true
		this.requestSubjects(page)
    },
	methods: {
		edit(index) {
			this.subject = JSON.parse(JSON.stringify(this.subjects[index]))
			this.editMode = true
		},
		showDeleteModal(subjectId) {
			this.subjectToBeRemovedId = subjectId
			this.$bvModal.show('modal-delete-subject')
		},
		deleteSubject(subjectId) {
			this.$bvModal.hide('modal-delete-subject')
			this.overlayShow = true
			this.$http.deleteSubject(subjectId)
			.then((response) => {
				this.subjects = response.data
				this.$store. commit('UPDATE_STORED_USER_SUBJECTS', {
                    subjects: response.data
                })
				this.overlayShow = false
			})
			.catch((error) => {
				console.log(error.request)
				this.$bvModal.hide('modal-delete-subject')
				this.overlayShow = false
			})
		},
		addSubject() {
			let subject = ({
				title: '',
				level: 'EASY',
				tasks: [],
				user: this.storedUser
			})
			for(let i = 0; i < 10; i++) {
				subject.tasks.push({
					prompt: '',
					shuffleOptions: false,
					options: [
						{ prompt: '', correct: false },
						{ prompt: '', correct: false }
					]
				})
			}
			this.$router.push({ name: 'subject', params: { newSubject: subject } })
		},
		requestSubjects(page) {
			this.overlayShow = true
			this.$http.getSubjectByTeacerh(this.storedUser.id, page, this.pageSize)
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
			this.$store.commit('DEFINE_EDIT_SUBJECT_ID', subject.id)
			this.$router.push({ name: 'subject', params: { subjectId: subject.id } })
		}
	}
}
</script>

<style>
.custom-link {
	color: inherit!important
}

</style>