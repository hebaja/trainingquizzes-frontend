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
			<b-col cols="12">
				<h3 class="text-center mt-3">{{ reducedListTasks[taskIndex].prompt }}</h3>
			</b-col>
			<b-col cols="10" class="mt-3 mx-auto">
				<AppButton 
					v-for="option in reducedListTasks[taskIndex].options" :key="option.id" 
					class="mt-2"
					:label="option.prompt"
					:smallShadow="true"
					:disabled="optionButtonDisabled"
					@appButtonClick="checkOption(option.correct)">
					{{ option.prompt }}
				</AppButton>
			</b-col>
			<b-col>
				<h4 class="text-center mt-3">Score: {{score}}</h4>
			</b-col>
			<b-col class="mt-3">
				<div v-show="showNextQuestionSection">
					<b-row align-h="center">
						<b-col cols="4">
							<b-card no-body class="text-center text-light h-100" :class="warning.cardClass">
								<span id="warning-content" class="mt-1 d-none d-sm-block">{{ warning.label }}<font-awesome-icon class="ms-1" :icon="warning.icon" /></span>
								<span id="warning-content" class="mt-1 d-block d-sm-none">{{ warning.labelReduced }}<font-awesome-icon class="ms-1" :icon="warning.icon" /></span>
							</b-card>
						</b-col>
						<b-col cols="4 offset-2">
							<AppButton
								@appButtonClick="shiftTaskOrSaveResult">
								<span class="d-none d-sm-block">{{ buttonNextLabel }}<span><font-awesome-icon class="ms-1" :icon="buttonNextIcon" /></span></span>
								<span class="d-block d-sm-none">{{ buttonNextLabelReduced }}<span><font-awesome-icon class="ms-1" :icon="buttonNextIcon" /></span></span>
							</AppButton>
						</b-col>
					</b-row>
				</div>
			</b-col>
		</div>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from './buttons/AppButton.vue'

export default {
  name: "english_app",
  data() {
    return {
		value: 45,
		max: 100,
		score: 0,
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
		finalScoreObject: {
			userId: null,
			subjectId: null,
			score: null
		},
		warning: {
			label: null,
			labelReduced: null,
			cardClass: null,
			icon: 'fa-solid fa-check-circle'
		},
		subjects: null,
			tasks: null,
			reducedListTasks: null,
			taskIndex: 0,
			disableButton: false,
			showNextQuestionSection: false,
			optionButtonDisabled: false,
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
		AppButton
	},

	computed: {
		...mapGetters(['userId']),
		...mapGetters(['storedExercise']),
		buttonNextLabel: function() {
			if(this.taskIndex <= 8) {
				return 'Next question'	
			} else {
				return 'Save result'
			}
							
		},
		buttonNextLabelReduced: function() {
			if(this.taskIndex <= 8) {
				return 'Next'	
			} else {
				return 'Finish'
			}
		},
		buttonNextIcon: function() {
			if(this.taskIndex <= 8) {
				return 'fa-solid fa-arrow-right'	
			} else {
				return 'fa-solid fa-save'
			}
		},
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
				this.finalScoreObject.subjectId = subjectId
			})
			.catch(error => console.log(error))
		},
		createReducedTasksList() {
			if(this.tasks != null) {
				this.reducedListTasks = this.tasks.slice().sort(() => Math.random() - 0.5)
				this.reducedListTasks.splice(0, 10)
			}
		},
		checkOption(correct) {
			this.showNextQuestionSection = true
			this.optionButtonDisabled = true
			if(correct) {
				this.warning.label = 'Right answer'
				this.warning.labelReduced = 'Right'
				this.warning.cardClass = 'bg-success'
				this.warning.icon = 'fa-solid fa-check-circle'
				this.score++
			} else {
				this.warning.label = 'Wrong answer'
				this.warning.labelReduced = 'Wrong'
				this.warning.cardClass = 'bg-danger'
				this.warning.icon = 'fa-solid fa-times-circle'
			}
		},
		shiftTaskOrSaveResult() {
			if(this.taskIndex <= 8) {
				this.taskIndex++
				this.showNextQuestionSection = false
				this.optionButtonDisabled = false
			} else {
				this.saveResult()
			}
		},
		
		saveResult() {
			this.finalScoreObject.userId = this.userId;
			this.finalScoreObject.score = this.score
			this.$store.dispatch('createFinalResultObject', this.finalScoreObject)
			this.$router.push({ path: '/final_score' })
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