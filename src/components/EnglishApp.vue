<template>
	<b-row class="w-100 mx-auto mt-3">
		<div v-if="!reducedListTasks">
			<b-col cols="12">
				<h1 class="text-center">Choose a level</h1>
			</b-col>
			<b-col cols="10" class="mx-auto mt-3">
				<AppButton
					v-for="(level, index) in levels" :key="level.id"
					class="mt-2"
					:label="level.title"
					:smallShadow="true"
					:disabled="level.buttonDisabled"
					@appButtonClick="fetchSubjects(level.title, index)">
					{{ level.title }}
				</AppButton>
			</b-col>
			<b-col cols="10" class="mx-auto mt-3">
				<h2 v-show="subjects" class="text-center mt-3">Choose a subject</h2>
				<AppButton
					v-for="subject in subjects" :key="subject.id" 
					class="mt-2"
					:label="subject.title"
					:smallShadow="true"
					@appButtonClick="fetchQuiz(subject.id)">
					{{ subject.title }}
				</AppButton>
			</b-col>
		</div>
		<div v-else>
			<AppQuizz :tasksList="reducedListTasks" :subjectId="subjectId" />
		</div>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from './buttons/AppButton.vue'
import AppQuizz from './shared/AppQuiz.vue'

export default {
  name: "english_app",
  data() {
    return {
		value: 45,
		max: 100,
		
		levels: [
			{
				id: 1,
				title: 'Easy',
				buttonDisabled: false
			},
			{
				id: 2,
				title: 'Medium',
				buttonDisabled: false
			},
			{
				id: 3,
				title: 'Hard',
				buttonDisabled: false
			}
		],
		
		subjectId: null,
		subjects: null,
		tasks: null,
		reducedListTasks: null,
		
		disableButton: false,
		
		
		showEndQuiz: false,
		error: null
		}
	},

	mounted() {
		if(Object.keys(this.storedExercise).length !== 0) {
			this.fetchQuiz(this.storedExercise.subjectId)
			this.$store.commit('RESET_STORED_EXERCISE')
		}
	},

	components: {
		AppButton,
		AppQuizz
	},

	computed: {
		...mapGetters(['userId']),
		...mapGetters(['storedExercise']),
		
	},

	methods: {
		fetchSubjects(level, index) {
			this.$http.get("/api/english/subjects?level=" + level.toUpperCase())
			.then(response => {
				this.subjects = response.data
				this.levels.forEach(level => level.buttonDisabled = false)
				this.levels[index].buttonDisabled = true
			})
			.catch(error => console.log(error))
		},
		fetchQuiz(subjectId) {
			this.$store.commit('RESET_FINAL_SCORE_OBJECT')
			this.$http.get("/api/english/task?subjectId=" + subjectId)
			.then(response => {
				this.tasks = response.data
				this.createReducedTasksList()
				this.subjectId = subjectId
			})
			.catch(error => console.log(error))
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
	}
}
</script>

<style>
	.quiz-button {
		text-align: center;
	}
</style>