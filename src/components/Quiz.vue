<template>
	<div id="quiz">
		<b-col cols="12">
			<h3 class="text-center mt-3">{{ tasksList[index].prompt }}</h3>
		</b-col>
		<b-overlay :show="overlayShow" rounded="lg">
			<b-col cols="10" class="mt-3 mx-auto">
				<AppButton 
					v-for="option in tasksList[index].options" :key="option.id" 
					class="mt-2"
					:label="option.prompt"
					:smallShadow="true"
					:disabled="optionButtonDisabled"
					@appButtonClick="checkOption(option.correct)">
					{{ option.prompt }}
				</AppButton>
			</b-col>
			<b-col>
				<h4 class="text-center mt-3">Score: {{ score }}</h4>
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
		</b-overlay>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from './buttons/AppButton.vue'
import { QuizUtil } from '../utils/QuizUtil'

const quizUtil = new QuizUtil()

export default {
	name: 'quiz',
	props: {
		tasksList: {
			type: Array,
			required: true
		},
		subjectId: {
			type: Number,
		},
	},
	components: { AppButton },
	data() {
		return {
			warning: {
				label: null,
				labelReduced: null,
				cardClass: null,
				icon: 'fa-solid fa-check-circle'
			},
			showNextQuestionSection: false,
			optionButtonDisabled: false,
			index: 0,
			score: 0,
			overlayShow: false
		}
	},
	computed: {
		...mapGetters(['userId']),
		buttonNextLabel() {
			return quizUtil.configureNextButtonLabel(this.index, false)
		},
		buttonNextLabelReduced() {
			return quizUtil.configureNextButtonLabelReduced(this.index)
		},
		buttonNextIcon() {
			return quizUtil.configureNextButtonIcon(this.index, false)
		},
		quizIsFinished() {
			return this.index >= 9
		}
	},
	methods: {
		checkOption(correct) {
			if(correct) {
				this.setOptionIsCorrectWarning()	
				this.score++
			} else {
				this.setOptionIsIncorrectWarning()
			}
			this.showNextQuestionSection = true
			this.optionButtonDisabled = true
		},
		shiftTaskOrSaveResult() {
			if(this.quizIsFinished) {
				this.saveResult()
			} else {
				this.fetchNextTask()
			}
		},
		fetchNextTask() {
			this.index++
			this.showNextQuestionSection = false
			this.optionButtonDisabled = false
		},
		setOptionIsCorrectWarning() {
			this.warning = quizUtil.correctWarningOption()
		},
		setOptionIsIncorrectWarning() {
			this.warning = quizUtil.incorrectWarningOption()
		},
		saveResult() {
			if(this.isTrial) {
				this.$router.push({ name: 'subscribed-quest', params: { questId: this.questId }})
			} else {
				const regularQuizResult = {
					userId: this.userId,
					subjectId: this.subjectId,
					score: this.score
				}
				this.$store.dispatch('createFinalResultObject', regularQuizResult)
				this.$router.push({ name: 'final-score', params: { subjectId: this.subjectId }})
			}
		},
	}
}
</script>

<style>

</style>