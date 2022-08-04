<template>
	<b-row class="w-100 mx-auto mt-3">
		<div v-if="!reducedListTasks">
			<div v-if="overlayShow" class="mt-3">
				<b-overlay :show="overlayShow" rounded="lg" opacity="1"/>
			</div>
			<div v-else>
				<b-col cols="12" class="d-flex justify-content-center">
					<b-avatar
						size="lg"
						href="#"
						to="profile"
						:src="currentUserAuthor.pictureUrl ? currentUserAuthor.pictureUrl : 'https://icones.pro/wp-content/uploads/2022/02/services-parametres-et-icone-d-engrenage-jaune.png'" />
				</b-col>
				<b-col cols="12">
					<h2 class="text-center">{{ currentUserAuthor.username }}'s subjects</h2>
				</b-col>
				<b-col cols="12" >
					<Search :isSubjectsFilteredByUser="true" :userId="currentUserAuthor.id" :inputLabel="'Search in ' + currentUserAuthor.username + '\'s subjects'"/>
				</b-col>
				<b-col cols="12" class="mt-4">
					<h4 class="text-center">Search by level</h4>
				</b-col>
				<b-row cols="10">
				<b-col v-for="(level, index) in levels" :key="level.id" cols="12" lg="4" class="mx-auto mt-1">
					<b-overlay :show="subjectsOvelayShow" spinner-small>
						<AppButton
							:buttonDisabled="level.buttonDisabled"
							class="mt-2"
							@appButtonClick="fetchSubjects(level, index)">
								{{ level.title }}
						</AppButton>
					</b-overlay>
				</b-col>
				</b-row>
				<Pagination v-if="payload" :payload="payload" @shiftPage="shiftPage" :overlayShow="subjectsOvelayShow">
					<hr />
					<SubjectItems :subjects="subjects"/>
				</Pagination>
			</div>
		</div>
		<div v-else>
			<Quiz :tasksList="reducedListTasks" :subjectId="subjectId" />
		</div>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from '../../components/buttons/AppButton.vue'
import Quiz from '../../components/Quiz.vue'
import Search from '../../components/Search.vue'
import Pagination from '../../components/Pagination.vue'
import SubjectItems from '../../components/lists/SubjectItems.vue'
import { required } from 'vuelidate/lib/validators'

export default {
	name: 'quiz-by-levels',
	props: {
		userAuthor: {
			type: Object,
		}
	},
	data() {
		return {
			subjectId: null,
			subjects: [],
			tasks: null,
			reducedListTasks: null,
			disableButton: false,
			showEndQuiz: false,
			error: null,
			payload: null,
			overlayShow: false,
			subjectsOvelayShow: false,
			paginationOverlayShow: false,
			currentUserAuthor: {},
			pageSize: 6,
			selectedLevel: {},
			levels: [
				{
					id: 1,
					title: 'Easy',
					buttonDisabled: false,
					level: 'easy'
				},
				{
					id: 2,
					title: 'Medium',
					buttonDisabled: false,
					level: 'medium'
				},
				{
					id: 3,
					title: 'Hard',
					buttonDisabled: false,
					level: 'hard'
				}
			],
		}
	},
	validations() {
		return {
			searchQuery: { required }
		}
	},
	mounted() {
		if(Object.keys(this.storedExercise).length !== 0) {
			this.fetchQuiz(this.storedExercise.subjectId)
			this.$store.commit('RESET_STORED_EXERCISE')
		}
		if(this.userAuthor) {
			this.currentUserAuthor = this.userAuthor
			this.$store.dispatch('defineUserAuthor', this.currentUserAuthor)
		} else if(Object.keys(this.storedUserAuthor).length !== 0) {
			this.currentUserAuthor = this.storedUserAuthor
		} else {
			this.overlayShow = true
			// HERE A DEFAULT USER SHOULD BE LOADED
			this.$http.getUser(2)
			.then((response) => {
				this.currentUserAuthor = response.data
				this.overlayShow = false
			})
			.catch((error) => {
				this.$notice['error']({
					title: 'Error',
					description: 'Could not load default quizzes. ' + error,
					styles: { top: "4em" }
				})
				this.$router.push({ name: "index"})
				this.overlayShow = false
			})
		}
	},
	components: {
		AppButton,
		Quiz,
		Pagination,
		Search,
		SubjectItems
	},
	computed: {
		...mapGetters(['userId']),
		...mapGetters(['storedExercise']),
		...mapGetters(['storedUserAuthor'])
		
	},
	methods: {
		fetchSubjects(level, index) {
			this.levels.forEach(level => level.buttonDisabled = false)
			this.levels[index].buttonDisabled = true
			const page = 0
			this.selectedLevel = level
			this.requestSubjects(level, page)
		},
		requestSubjects(level, page) {
			this.subjectsOvelayShow = true
			this.$http.getSubjectsByUserAndLevel(this.currentUserAuthor.id, page, this.pageSize, level.level)
			.then((response) => {
				this.payload = response.data
				this.subjects = response.data.content
				this.subjectsOvelayShow = false
			})
			.catch((error) => {
				console.log(error)
				this.$notice['error']({
					title: 'Error',
					description: 'Could not load subjects. ' + error,
					styles: { top: "4em" }
				})
				this.subjectsOvelayShow = false
			}) 
		},
		fetchQuiz(subjectId) {
			this.$store.commit('RESET_FINAL_SCORE_OBJECT')
			this.$http.getTasksBySubject(subjectId)
			.then(response => {
				this.tasks = response.data
				this.createReducedTasksList()
				this.subjectId = subjectId
			})
			.catch((error) => {
				console.log(error)
				this.$notice['error']({
					title: 'Error',
					description: 'Could not load subjects. ' + error,
					styles: { top: "4em" }
				})
			})
		},
		createReducedTasksList() {
			if(this.tasks != null) {
				this.reducedListTasks = this.tasks.slice().sort(() => Math.random() - 0.5)
				this.reducedListTasks.splice(0, 10)
			}
		},
		tryQuizAgain() {
			this.resetQuiz()
			this.createReducedTasksList()
		},
		goToMainMenu() {
			this.resetQuiz()
			this.reducedListTasks = null
			this.subjects = null
				this.levels.forEach(level => level.buttonDisabled = false)
		},
		resetQuiz() {
			this.showEndQuiz = false
			this.score = 0
			this.taskIndex = 0
			this.showNextQuestionSection = false
			this.optionButtonDisabled = false
		},
		shiftPage(index) {
			const page = index
			this.requestSubjects(this.selectedLevel, page)
		}
	}
}
</script>

<style>
	.quiz-button {
		text-align: center;
	}
</style>