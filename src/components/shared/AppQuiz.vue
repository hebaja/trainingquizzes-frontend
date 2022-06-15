<template>
	<div id="quiz-app">
		<b-col cols="12">
			<h3 class="text-center mt-3">{{ tasksList[taskIndex].prompt }}</h3>
		</b-col>
		<b-col cols="10" class="mt-3 mx-auto">
			<AppButton 
				v-for="option in tasksList[taskIndex].options" :key="option.id" 
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
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from '../buttons/AppButton.vue'

export default {
	name: 'quiz-app',
	props: ['tasksList', 'subjectId'],
	components: { AppButton },
	data() {
		return {
			warning: {
				label: null,
				labelReduced: null,
				cardClass: null,
				icon: 'fa-solid fa-check-circle'
			},
			finalScoreObject: {
				userId: null,
				subjectId: null,
				score: null
			},
			showNextQuestionSection: false,
			optionButtonDisabled: false,
			taskIndex: 0,
			score: 0
		}
	},
	computed: {
		...mapGetters(['userId']),
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
			this.finalScoreObject.subjectId = this.subjectId
			console.log(this.finalScoreObject)
			this.$store.dispatch('createFinalResultObject', this.finalScoreObject)
			this.$router.push({ path: '/final_score' })
		},
	}
}
</script>

<style>

</style>