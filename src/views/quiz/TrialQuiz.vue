<template>
    <div id="trial-quiz">
		<div v-if="errorMessage" class="mt-4">
			<p class="text-danger text-center">{{ errorMessage }}</p>
		</div>

		<b-overlay :show="trialOverlayShow" rounded="lg"/>

		<div id="quiz" v-if="trial.task">
			<b-col cols="12">
				<h3 class="text-center mt-3">{{ trial.task.prompt }}</h3>
			</b-col>
			<b-overlay :show="overlayShow" rounded="lg">
				<b-col cols="10" class="mt-3 mx-auto">
					<AppButton 
						v-for="option in trial.task.options" :key="option.id" 
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
		<b-overlay :show="finishTrialOverlayShow" rounded="lg" class="mt-5"/>
    </div>
</template>

<script>
import { QuizUtil } from '../../utils/QuizUtil'
import { mapGetters } from 'vuex'

const quizUtil = new QuizUtil()

export default {
	name: 'trial-quiz',
	props: {
		receivedTrial: Object,
		receivedQuestId: Number
	},
	data() {
		return {
			tasks: null,
			reducedListTasks: null,
			errorMessage: '',

			trial: {},
			transientTrial: {},
			questId: null,
			score: 0,

			optionButtonDisabled: false,
			showNextQuestionSection: false,
			currentTask: null,
			overlayShow: false,
			trialOverlayShow: false,
			finishTrialOverlayShow: false,

			warning: {
				label: null,
				labelReduced: null,
				cardClass: null,
				icon: 'fa-solid fa-check-circle'
			},
		}
	},
	computed: {
		...mapGetters(['storedUser']),
		buttonNextLabel: function() {
			return quizUtil.configureNextButtonLabel(this.trial.tasksIndex, true)
		},
		buttonNextLabelReduced: function() {
			return quizUtil.configureNextButtonLabelReduced(this.trial.tasksIndex, true)
		},
		buttonNextIcon: function() {
			return quizUtil.configureNextButtonIcon(this.trial.tasksIndex, true)
		}
	},
	mounted() {
		if(this.receivedTrial) {
			if(!this.receivedTrial.finished) {
				this.trial = this.receivedTrial
				this.questId = this.receivedQuestId
			} else this.errorMessage = 'This trial has already been done'
		} else if(this.$route.query.trialId){
			if(this.storedUser.id == this.$route.query.userId) {
				const trialForm = {
					trialId: this.$route.query.trialId,
					userId: this.$route.query.userId,
					trialNumber: this.$route.query.trialNumber
				}
				this.trialOverlayShow = true
				this.$http.openTrial(trialForm)
				.then((response) => {
					
					if(!response.data.finished) {
						this.trial = response.data
						this.questId = response.data.questId
					} else this.errorMessage = 'This trial has already been done'
					this.trialOverlayShow = false
				})
				.catch((error) => {
					console.log(error)
					this.trialOverlayShow = false
					this.errorMessage = "It was not possible to load quest"	
				})
			} else {
				this.errorMessage = "This trial does not belong to this user"
				this.trialOverlayShow = false
			}
		} else {
			this.errorMessage = "It was not possible to load quest"
		}
	},
	methods: {
		checkOption(correct) {
			this.overlayShow = true
			const trialQuizForm = {
				id: this.trial.id,
				correct: correct
			}
			this.$http.updateTrial(trialQuizForm)
			.then((response) => {
				if(response.status === 200) {
					this.score = response.data.score
					this.transientTrial = response.data
					if(correct) {
						this.setOptionIsCorrectWarning()
					} else {
						this.setOptionIsIncorrectWarning()
					}
					this.overlayShow = false
					this.showNextQuestionSection = true
					this.optionButtonDisabled = true
				} else {
					this.overlayShow = false
					this.showErrorNotice('Could not check option. Please try again. ' + response.status)
				}
			})
			.catch((error) => {
				console.log(error)
				this.overlayShow = false
				this.showErrorNotice('Could not check option. Please try again. ' + error)
			})
		},
		shiftTaskOrSaveResult() {
			this.trial = this.transientTrial
			if(this.trial.finished) {
				this.finishTrial()
			} else {
				this.fetchNextTask()
			}
		},
		fetchNextTask() {
			this.showNextQuestionSection = false
			this.optionButtonDisabled = false
		},
		finishTrial() {
			this.finishTrialOverlayShow = true
			this.$http.getQuest(this.questId)
			.then((response) => {
				this.finishTrialOverlayShow = false
				this.$router.push({ name: 'subscribed-quest', params: { openQuest: response.data } })
			})
			.catch((error) => {
				this.finishTrialOverlayShow = false
				this.showErrorNotice('Could not redirect to quest. ' + error)
				console.log(error)
			})
		},
		setOptionIsCorrectWarning() {
			this.warning.label = 'Right answer'
			this.warning.labelReduced = 'Right'
			this.warning.cardClass = 'bg-success'
			this.warning.icon = 'fa-solid fa-check-circle'
		},
		setOptionIsIncorrectWarning() {
			this.warning.label = 'Wrong answer'
			this.warning.labelReduced = 'Wrong'
			this.warning.cardClass = 'bg-danger'
			this.warning.icon = 'fa-solid fa-times-circle'
		},
		showErrorNotice(description) {
			this.$notice['error']({
				title: 'Error',
				description: description,
				styles: { top: "4em" }
			})
		}
	}
}
	
	
</script>

<style>

</style>