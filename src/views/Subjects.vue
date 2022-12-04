<template>
	<b-row class="mt-3">
		<b-overlay :show="overlayShow" rounded="sm" opacity="0.9" variant="transparent" blur="5px">
			<b-col cols="12" v-if="payload != ''">
				<Pagination :payload="payload" :overlayShow="overlayShow" @shiftPage="shiftSubjectsPage">
					<SubjectsItems :subjects="payload.content" @subjectItemClick="openSubject($event)" />
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
import SubjectsItems from '../components/lists/SubjectsItems.vue'

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
			pageSize: 2,

			payload: ''
        }
    },
	components: {
		AppButton,
		Pagination,
		SubjectsItems
	},
	computed: {
		...mapGetters(['storedUser'])
	},
    mounted() {

		const page = 0

		this.requestSubjects(page)



		this.$store.dispatch('getUserSubjects', this.storedUser.id)
        .then((response) => {
			this.subjects = response
		})
        .catch((error) => {
            if (error.response) {
				console.log(error.response.status)
				this.errorMessage = 'There was a problem. Please try again.'
            } else if (error.request) {
				this.$router.push({ name: 'index' })
            } else {
				console.log('Error', error.message);
				this.errorMessage = 'There was a problem. Please try again.'
            }
        })
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
		returnToList() {
			this.subjects = this.storedUser.subjects
			this.editMode = false
		},
		updateSubjects(subjectsReceived) {
			this.subjects = subjectsReceived
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
			this.requestSubjects(page)

		},
		openSubject(subjectId) {
			this.$store.commit('DEFINE_EDIT_SUBJECT_ID', subjectId)
			this.$router.push({ name: 'subject', params: { subjectId: subjectId} })
		}
	}
}
</script>

<style>
.custom-link {
	color: inherit!important
}

</style>