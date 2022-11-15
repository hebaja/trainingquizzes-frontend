<template>
	<b-row class="mt-3">
		<div v-if="quest">
			<div v-if="quest.finished">
				<b-row class="mt-3">
					<b-col cols="12" class="text-center mt-3" >
						<h3><font-awesome-icon icon="fa-solid fa-flag-checkered" class="me-2"/>{{ quest.title }}</h3>
					</b-col>
					<b-col cols="12">
						<h5><font-awesome-icon icon="fa-solid fa-book" class="me-2"/>{{ quest.subject.title }}</h5>
					</b-col>
					<b-col cols="12">
						<font-awesome-icon icon="fa-solid fa-hourglass-start" class="me-1" />{{ generateDate(quest.startDate) }}
					</b-col>
					<b-col cols="12">
						<font-awesome-icon icon="fa-solid fa-hourglass-end" class="me-1" />{{ generateDate(quest.finishDate) }}
					</b-col>
					<b-col cols="12" class="text-center mt-2">
						<h4>Final score</h4>
					</b-col>
					<QuestScore :scores="questScores" class="mt-2"/>
					<ShowTrialsDone :trials="quest.trials" :thereIsResult="thereIsResult"/>
				</b-row>
			</div>
			<div v-else>
				<b-col cols="12" class="text-center">
					<h3><font-awesome-icon icon="fa-solid fa-flag-checkered" class="me-2"/>{{ quest.title }}</h3>
				</b-col>
				<b-col cols="12">
					<h5><font-awesome-icon icon="fa-solid fa-book" class="me-2"/>{{ quest.subject.title }}</h5>
				</b-col>
				<b-col cols="12">
					<h6>Author: {{ quest.user.username }} <b-avatar size="sm" :src="quest.user.pictureUrl"></b-avatar></h6>
				</b-col>
				<b-col class="d-none d-lg-block">
					<b-list-group>
						<b-overlay :show="trialsOverlayShow" rounded="sm">
							<b-list-group-item v-for="trial in currentUserTrials" :key="trial.id">
								<div class="d-flex w-100 justify-content-between">
									<span class="mt-2">
										<font-awesome-icon icon="fa-solid fa-flag" class="me-1"/>
										Trial {{ trial.trialNumber }} -
										<font-awesome-icon icon="fa-solid fa-hourglass-start" class="me-1" />{{ generateDate(trial.startDate)}} -
										<font-awesome-icon icon="fa-solid fa-hourglass-end" class="me-1" />{{ generateDate(trial.finishDate)}}
										<span v-if="trial.score">- <font-awesome-icon icon="fa-soli fa-star" class="me-1" /> Score: {{ trial.score }}</span>
										<span v-else>- <font-awesome-icon icon="fa-soli fa-star" class="me-1" />Score: 0</span>
									</span>
									<span class="w-25">
										<AppButton
											@appButtonClick="takeTrial(trial)"
											:disabled="trialIsBetweenStartAndFinishDate(trial.startDate, trial.finishDate) || trial.finished">
												<span v-if="trial.finished">Trial done</span>
												<span v-else-if="!trialIsBetweenStartAndFinishDate(trial.startDate, trial.finishDate)">Take trial</span>
												<span v-else-if="trialIsExpired(trial.finishDate)">Trial expired</span>
												<span v-else>Not available yet</span>
										</AppButton>
									</span>
								</div>
							</b-list-group-item>
						</b-overlay>
					</b-list-group> 
				</b-col>
				<b-col class="d-md-block d-lg-none">
					<b-overlay :show="trialsOverlayShow" spinner-small>
						<b-list-group-item v-for="trial in currentUserTrials" :key="trial.id">
							<b-row>
								<b-col cols="6">
									<b-col cols="12">
										<font-awesome-icon icon="fa-solid fa-flag" class="me-1"/> Trial {{ trial.trialNumber }}
									</b-col>
									<b-col cols="12">
										<font-awesome-icon icon="fa-solid fa-hourglass-start" class="me-1" />{{ generateDate(trial.startDate)}}
									</b-col>
									<b-col cols="12">
										<font-awesome-icon icon="fa-solid fa-hourglass-end" class="me-1" />{{ generateDate(trial.finishDate)}}
									</b-col>
									<b-col cols="12">
										<span v-if="trial.score"><font-awesome-icon icon="fa-soli fa-star" class="me-1" /> Score: {{ trial.score }}</span>
										<span v-else><font-awesome-icon icon="fa-soli fa-star" class="me-1" />Score: 0</span>
									</b-col>
								</b-col>
								<b-col cols="6" class="mt-4">
										<AppButton
											@appButtonClick="takeTrial(trial)"
											buttonStyle="large"
											:disabled="trialIsBetweenStartAndFinishDate(trial.startDate, trial.finishDate) || trial.finished">
												<span v-if="trial.finished">Trial done</span>
												<span v-else-if="!trialIsBetweenStartAndFinishDate(trial.startDate, trial.finishDate)">Take trial</span>
												<span v-else-if="trialIsExpired(trial.finishDate)">Trial expired</span>
												<span v-else>Not available</span>
										</AppButton>
								</b-col>
								<hr />
							</b-row>
						</b-list-group-item>
					</b-overlay>
				</b-col>
				<ShowTrialsDone :trials="quest.trials" :thereIsResult="thereIsResult"/>
				<ShowPartialScore :scores="quest.scores"/>
			</div>
		</div>
    </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateUtil } from '../../utils/DateUtil'
import { QuestUtil } from '../../utils/QuestUtil'
import AppButton from '../../components/buttons/AppButton.vue'
import ShowTrialsDone from '../../components/quest/ShowTrialsDone.vue'
import ShowPartialScore from '../../components/quest/ShowPartialScore.vue'
import QuestScore from '../../components/quest/QuestScore.vue'

const dateUtil = new DateUtil()
const questUtil = new QuestUtil()

export default {
    name: 'subscribed-quest',
    props: {
		openQuest: Object,
	},
	components: { 
		AppButton,
		ShowTrialsDone,
		ShowPartialScore,
		QuestScore,
	},
    data() {
        return {
            quest: '',
			trialsOverlayShow: false
        }
    },
    mounted() {
        if(this.openQuest) {
			this.quest = this.openQuest
		} else {
			this.$notice['error']({
				title: 'Error',
				description: 'Could not load quest.',
				styles: { top: '4em' }
			})
			this.$router.push({ name: 'quests-by-user' })
		}
    },
	computed: {
		...mapGetters(['storedUser']),
		currentDate() {
			return new Date()
		},
		currentUserTrials() {
			return this.quest.trials.filter(trial => trial.user.id === this.storedUser.id)
		},
		trialsDone() {
			return questUtil.trialsDone(this.quest.trials)
		},
		thereIsResult() {
			let thereIsResult = false
			if(this.quest.trials != null) {
				this.quest.trials.forEach(trial => {
					if(trial.score != null) {
						thereIsResult = true
					}
				})
			}
			return thereIsResult
		},
		questScores() {
			return this.openQuest.scores
		}
	},
	methods: {
		takeTrial(trial) {
			const trialForm = {
				trialId: trial.id,
				userId: this.storedUser.id,
				trialNumber: trial.trialNumber
			}
			this.trialsOverlayShow = true
			this.$http.openTrial(trialForm)
			.then((response) => {
				this.$router.push({ name: 'trial-quiz', params: { receivedTrial: response.data, receivedQuestId: this.openQuest.id } })
				this.trialsOverlayShow = false
			})
			.catch((error) => {
				this.$notice['error']({
					title: 'Error',
					description: 'Could not initialize trial' + error,
					styles: { top: '4em' }
				})
				console.log(error)
				this.trialsOverlayShow = false
			})
		},
		trialIsBetweenStartAndFinishDate(receivedStartDate, receivedFinishDate) {
			const startDate = new Date(receivedStartDate)
			const finishDate = new Date(receivedFinishDate)

			const systemTimeZone = dateUtil.getTimeZone()
			const questTimeZone = this.quest.timeZone

			if(systemTimeZone != questTimeZone) {
				const convertedStartDate = dateUtil.convertToLocalDateTime(startDate)
				const convertedFinishDate = dateUtil.convertToLocalDateTime(finishDate)

				return this.checkIfTrialCanBeTaken(convertedStartDate, convertedFinishDate)
			} else {
				return this.checkIfTrialCanBeTaken(startDate, finishDate)
			}
		},
		checkIfTrialCanBeTaken(startDate, finishDate) {
			const trialCanBeTaken = startDate.getTime() < this.currentDate.getTime() && finishDate.getTime() > this.currentDate.getTime()
			return !trialCanBeTaken
		},
		trialIsExpired(date) {
			const finishDate = new Date(date)
			return this.currentDate > finishDate
		},
		generateDate(rawDate) {
			return dateUtil.formatDateAndTime(rawDate)
		}
	}
}
</script>

<style>

</style>