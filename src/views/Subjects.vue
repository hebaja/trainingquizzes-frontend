<template>
	<b-row class="mt-3">
		<b-overlay :show="showOverlay">
			<div v-if="!editMode">
				<b-col cols="12">
					<table class="table table-striped">
						<thead>
							<tr>
								<th>#</th>
								<th>Subject</th>
								<th>Level</th>
								<th class="text-center">Number of tasks</th>		
								<th class="text-center">Edit</th>
								<th class="text-center">Remove</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(subject, index) in subjects" :key="subject.id">
								<th>{{ index + 1 }}</th>
								<td>{{ subject.title }}</td>
								<td>{{ subject.level.charAt(0) + subject.level.slice(1).toLowerCase() }}</td>
								<td class="text-center">{{ subject.tasks.length }}</td>
								<td class="text-center">
									<b-link href="#" class="custom-link" @click="edit(index)">
										<font-awesome-icon class="ms-1" icon="fa-solid fa-pencil" />
									</b-link>
								</td>
								<td class="text-center">
									<b-link href="#" class="custom-link" @click="showDeleteModal(subject.id)">
										<font-awesome-icon class="ms-1" icon="fa-solid fa-trash" />
									</b-link>
								</td>
							</tr>
							<Modal 
								:modalId="'modal-delete-subject'"
								:message="'Do you really want to delete this subject?'"
								@componentFunction="deleteSubject(subjectToBeRemovedId)"
								:confirmButtonLabel="'Delete'">
							</Modal>
						</tbody>
					</table>
				</b-col>
				<b-col cols="12" lg="8"  class="mx-auto mt-2">
					<AppButton 
						@appButtonClick="addSubject">
						Add subject
					</AppButton>
				</b-col>
			</div>
			<div v-else>
				<Subject :subject="subject" @returnToList="returnToList" @updateSubjects="updateSubjects($event)"/>
			</div>
		</b-overlay>
	</b-row>
</template>

<script>
import Modal from '../components/Modal.vue'
import Subject from '../components/Subject.vue'
import { mapGetters } from 'vuex'
import AppButton from '../components/buttons/AppButton.vue'

export default {
    name: 'subjects',
    data() {
        return {
            subjects: '',
			subject: {},
			editMode: false,
			subjectToBeRemovedId: null,
			showOverlay: false
        }
    },
	components: {
		Modal,
		Subject,
		AppButton
	},
	computed: {
		...mapGetters(['storedUser'])
	},
    mounted() {
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
			this.showOverlay = true
			this.$http.deleteSubject(subjectId)
			.then((response) => {
				this.subjects = response.data
				this.$store. commit('UPDATE_STORED_USER_SUBJECTS', {
                    subjects: response.data
                })
				this.showOverlay = false
			})
			.catch((error) => {
				console.log(error.request)
				this.$bvModal.hide('modal-delete-subject')
				this.showOverlay = false
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
						{prompt: '', correct: false},
						{prompt: '', correct: false}
					]
				})
			}
			this.subject = subject
			this.editMode = true
		}
	}
}
</script>

<style>
.custom-link {
	color: inherit!important
}

</style>