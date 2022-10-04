<template>
	<b-overlay :show="showQuestOverlay" rounded="sm">
		<div v-if="quest.finished">
			<b-row class="mt-3">
				<b-col class="mt-2" cols="12" lg="4">
					<FormControlButtons returnButtonLabel="Return to list" saveButtonLabel="Save quest" class="col-12" @returnToList="returnToList" :saveButtonDisabled="true"/>
				</b-col>
				<b-col cols="12" class="text-center mt-3" >
					<h3><font-awesome-icon icon="fa-solid fa-flag-checkered" class="me-2"/>{{ quest.title }}</h3>
				</b-col>
				<b-col cols="12">
					<h5><font-awesome-icon icon="fa-solid fa-book" class="me-2"/>{{ quest.subject.title }}</h5>
				</b-col>
				<b-col cols="12">
					<font-awesome-icon icon="fa-solid fa-hourglass-start" class="me-1" />{{ generateFormatDate(quest.startDate) }}
				</b-col>
				<b-col cols="12">
					<font-awesome-icon icon="fa-solid fa-hourglass-end" class="me-1" />{{ generateFormatDate(quest.finishDate) }}
				</b-col>
				<b-col cols="12" class="text-center mt-2">
					<h4>Final score</h4>
				</b-col>
				<QuestScore :scores="quest.scores" class="mt-2"/>
				<ShowSubscribedUsers 
					:subscribedUsers="quest.subscribedUsers ? quest.subscribedUsers : []" 
					:questId="quest.id ? quest.id : 0" 
					:questIsFinished="true"
					@updateUsers="updateSubscribedUsers"/> 
				<div v-if="quest.trials">
					<ShowTrialsDone :trials="quest.trials" :thereIsResult="thereIsResult"/>
				</div>
				<b-col cols="12" class="text-center mt-3 text-danger">
					<h3>
						<font-awesome-icon
							icon="fa-solid fa-trash"
							@click.prevent="$bvModal.show('modal-delete-finished-quest')"
							v-b-tooltip.hover title="Delete this quest"
							style="cursor: pointer;"
						/>
					</h3>
				</b-col>
				<Modal
					:modalId="'modal-delete-finished-quest'"
					:message="'Do you really want to delete this quest? All related data will be erased.'"
					@componentFunction="deleteQuest"
					:confirmButtonLabel="'Delete'">
				</Modal>
			</b-row>
		</div>
		<div v-else>
			<b-form class="mt-3" @submit.prevent="saveQuest">
				<b-row class="mx-auto">
					<b-col class="mt-2" cols="12" lg="4">
						<FormControlButtons returnButtonLabel="Return to list" saveButtonLabel="Save quest" class="col-12" @returnToList="returnToList"/>
					</b-col>
					<b-col cols="12">
						<p v-if="errorMessage" class="text-center text-danger">{{ errorMessage }}</p>	
					</b-col>
					<b-col cols="12" class="mt-3" >
						<label for="form-input-quest-title">Quest title:</label>
					</b-col>
					<b-col cols="12" class="mt-3 mt-lg-0">
						<b-input-group>
							<span class="input-group-text" id="quest-title-addon"><font-awesome-icon class="ms-1" icon="fa-solid fa-flag-checkered" /></span>
							<b-form-input
								id="form-input-quest-title"
								v-model="quest.title"
								class="shadow"
								type="text"
								aria-describedby="subject-title-addon"
								placeholder="Insert quest title">
							</b-form-input>
							<b-form-invalid-feedback :state="!$v.quest.title.$error">
								This field is required
							</b-form-invalid-feedback>
						</b-input-group>
					</b-col>
					<b-col cols="12" lg="6" class="mt-1">
						<label for="starting-date-datepicker">Starting date:</label>
						<b-form-datepicker 
							id="starting-date-datepicker"
							class="mb-2 shadow"
							v-model="startDateForm"
							weekday-header-format="narrow"
							locale="en-US" 
							:min="currentDateTime"
							:disabled="questIsNotNew"
							@context="onStartDateContext"
						/>
					</b-col>
					<b-col cols="12" lg="6" class="mt-1">
						<label for="starting-time-timepicker">Starting time:</label>
						<b-form-timepicker
							id="starting-time-timepicker"
							class="shadow"
							v-model="formatStartTime"
							:hour12='false'
							now-button 
							reset-button
							locale="en"
							:disabled="questIsNotNew"
							@context="onStartTimeContext" 
						/>
					</b-col>
					<b-col cols="12" lg="6" class="mt-1">
						<label for="finishing-date-datepicker">Finishing date:</label>
						<b-form-datepicker 
							id="example-datepicker"
							class="mb-2 shadow" 
							v-model="finishDateForm"
							weekday-header-format="narrow"
							locale="en-US"
							:min="minFinishDate"
							:max="maxFinishDate"
							:disabled="questIsNotNew"
							@context="onFinishDateContext"
						/>
					</b-col>
					<b-col cols="12" lg="6" class="mt-1">
						<label for="example-datepicker">Finishing time:</label>
						<b-form-timepicker 
							v-model="formatFinishTime"
							class="shadow"
							:hour12='false'
							now-button
							reset-button
							locale="en"
							:disabled="questIsNotNew"
							@context="onFinishTimeContext" 
						/>
						<b-form-invalid-feedback :state="finishDateIsHigherThanOneDay">
								Finishing time must be equal or higher than 24hrs.
						</b-form-invalid-feedback>
					</b-col>
					<b-col cols="12" class="mt-1">
						Selected subject:
						<b-card no-body class="shadow">
							<div class="m-2">
								<font-awesome-icon class="ms-1 me-2" icon="fa-solid fa-book" />
								<span v-if="subject">{{ subject.title }} - {{ subject.level }}</span>
								<span v-else>No subject selected</span>
							</div>
						</b-card>
						<b-form-invalid-feedback :state="!$v.subject.$error">
							You must select a subject
						</b-form-invalid-feedback>
					</b-col>
					<b-col cols="12" lg="8" offset-lg="2" class="mt-3">
						<AppButton
						:buttonDisabled="questIsNotNew"
							v-b-toggle.collapse-2-inner>
								<span v-if="subject">Change selected subject</span>
								<span v-else>Choose a subject</span>
								<font-awesome-icon 
									class="ms-2" 
									icon="fa-solid fa-rectangle-list" />
						</AppButton>
					</b-col>
					<b-col cols="12" lg="8" offset-lg="2">
						<b-collapse id="collapse-2-inner" class="mt-2">
							<b-list-group>
								<b-list-group-item href="#" v-for="subjectOption in userSubjectsOptions" :key="subjectOption.id" @click="changeSelectedSubject(subjectOption)">
									<font-awesome-icon class="ms-1 me-2" icon="fa-solid fa-book" /><span>{{ subjectOption.title }} - {{ subjectOption.level }}</span>
								</b-list-group-item>
							</b-list-group>
						</b-collapse>
					</b-col>
					<b-col cols="12" lg="8" offset-lg="2" class="mt-1">
						<label for="quantity-of-trials">Quantity of trials</label>
						<b-form-spinbutton
							v-model="trialsQuantity" 
							id="quantity-of-trials"
							class="shadow" 
							size="sm"
							min="1"
							:disabled="questIsNotNew"
							:max="maxTrialsQuantity" 
						/>
					</b-col>
					<b-col cols="12" lg="8" offset-lg="2" class="mt-1">
						<b-list-group class="shadow">
							<b-list-group-item v-for="trial in trials" :key="trial.id">
								{{ trial.id + 1 }} - From <b>{{ generateFormatDate(trial.startDate) }}</b>
								/ to <b>{{ generateFormatDate(trial.finishDate) }}</b>
							</b-list-group-item>
						</b-list-group>
					</b-col>
					<ShowSubscribedUsers
						:subscribedUsers="quest.subscribedUsers ? quest.subscribedUsers : []"
						:questId="quest.id ? quest.id : 0"
						:questIsFinished="false"
						@updateUsers="updateSubscribedUsers"/>
					<div v-if="quest.trials">
						<ShowTrialsDone :trials="quest.trials" :thereIsResult="thereIsResult"/>
					</div>
					<div v-if="questIsNotNew">
						<ShowPartialScore :scores="quest.scores" />

						<b-col cols="12" lg="8" offset-lg="2" class="mt-3">
							<b-alert variant="success" show class="text-center">Subscription link: {{ urlBase }}/#/quest-subscribe?questId={{ quest.id }}</b-alert>
						</b-col>

						<b-col cols="12" class="text-center mt-3">
							<b-link v-b-tooltip.hover title="Link to send to your students" style="text-decoration: none;" @click.prevent="copySubscriptionInvitation">
								<h5>
									Copy subscription invitation link<font-awesome-icon icon="fa-solid fa-link" class="ms-1"/>
								</h5>
							</b-link>
						</b-col>
						<b-col cols="12" class="text-center mt-3">
							<b-link v-b-tooltip.hover title="Finish quest before due time" style="text-decoration: none;" @click.prevent="$bvModal.show('modal-finish-open-quest')">
								<h5>
									Finish quest<font-awesome-icon icon="fa-solid fa-check-double" class="ms-1"/>
								</h5>
							</b-link>
						</b-col>
						<Modal 
							modalId="modal-finish-open-quest"
							message="Do you really want to finish this quest before due time?"
							@componentFunction="finishQuest"
							confirmButtonLabel="Finish">
						</Modal>
						<b-col cols="12" class="text-center mt-3 text-danger">
							<h3>
								<font-awesome-icon
									icon="fa-solid fa-trash"
									@click.prevent="$bvModal.show('modal-delete-open-quest')"
									v-b-tooltip.hover title="Delete this quest"
									style="cursor: pointer;"
								/>
							</h3>
						</b-col>
						<Modal 
							:modalId="'modal-delete-open-quest'"
							:message="'Do you really want to delete this quest? All related data will be erased.'"
							@componentFunction="deleteQuest"
							:confirmButtonLabel="'Delete'">
						</Modal>
					</div>
				</b-row>
			</b-form>
		</div>
	</b-overlay>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from '../../components/buttons/AppButton.vue'
import { required } from 'vuelidate/lib/validators'
import FormControlButtons from '../../components/buttons/FormControlButtons.vue'
import { DateUtil } from '../../utils/DateUtil'
import { QuestUtil } from '../../utils/QuestUtil'
import ShowTrialsDone from '../../components/quest/ShowTrialsDone.vue'
import ShowSubscribedUsers from '../../components/quest/ShowSubscribedUsers.vue'
import ShowPartialScore from '../../components/quest/ShowPartialScore.vue'
import Modal from '../../components/Modal.vue'
import QuestScore from '../../components/quest/QuestScore.vue'

const dateUtil = new DateUtil()
const questUtil = new QuestUtil()

export default {
    name: 'quest',
    props: ['openQuest'],
    data() {
        return {
            quest: {},
			subject: '',
			formatStartTime: '',
			formatFinishTime: '',
			userSubjectsOptions: '',
			selected: null,
			startDateContext: null,
			startTimeContext: null,
			finishDateContext: null,
			finishTimeContext: null,
			trialsQuantity: '',
			startDateForm: '',
			finishDateForm: '',
			errorMessage: '',
			showQuestOverlay: false,
			urlBase: process.env.VUE_APP_DEFAULT_BASE_URL
        }
    },
	components: {
		FormControlButtons,
		AppButton,
		ShowTrialsDone,
		ShowSubscribedUsers,
		ShowPartialScore,
		Modal,
		QuestScore
	},
	computed: {
		...mapGetters(['storedUser']),
		currentDateTime() {
			return new Date()
		},
		minFinishDate() {
			const date = new Date()
			date.setDate(this.currentDateTime.getDate() + 1)
			return date
		},
		maxFinishDate() {
			const date = new Date()
			date.setDate(this.currentDateTime.getDate() + 7) 
			return date
		},
		fullSelectedStartDateTime() {
			if(this.startDateContext && this.startTimeContext) return this.startDateContext['selectedYMD'] + 'T' + this.startTimeContext['value']
			return null
		},
		fullSelectedFinishDateTime() {
			if(this.finishDateContext && this.finishTimeContext) return this.finishDateContext['selectedYMD'] + 'T' + this.finishTimeContext['value']
			return null
		},
		trials() {
			return questUtil.generateTrials(this.fullSelectedStartDateTime, this.fullSelectedFinishDateTime, this.trialsQuantity)
		},
		maxTrialsQuantity() {
			return questUtil.generateMaximumTrialsQuantity(this.fullSelectedStartDateTime, this.fullSelectedFinishDateTime)
		},
		finishDateIsHigherThanOneDay() {
			return questUtil.assertFinishDateHigherThanOneDay(this.fullSelectedStartDateTime, this.fullSelectedFinishDateTime)
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
		resultBuilt() {
			let results = []
			if(this.quest.results != null) {
				for (const [key, score] of Object.entries(this.quest.results)) {
					let result = {
						name: key,
						score: score
					}
					results.push(result)
				}
			}

			return results.sort((resultA, resultB) => {
				return resultB.score - resultA.score
			})
		},
		questIsNotNew() {
			return this.quest.id != null
		},
	},
	mounted() {
		if(this.openQuest) {
			this.quest = this.openQuest
			this.subject = this.quest.subject
			this.startDateForm = this.quest.startDate
			this.finishDateForm = this.quest.finishDate
			this.trialsQuantity = this.quest.timeInterval
			this.userSubjectsOptions = this.quest.user.subjects.filter(subject => subject.id != this.subject.id)
			this.formatDates()


			console.log(this.quest)
		} else {
			this.$router.push({ name: 'quests-by-user' })
		}
    },
    watch: {
		startDateForm(val, oldVal) {
			if(oldVal != '') this.trialsQuantity = 1
		},
		formatStartTime(val, oldVal) {
			if(oldVal != '') this.trialsQuantity = 1
		},
		finishDateForm(val, oldVal) {
			if(oldVal != '') this.trialsQuantity = 1
		},
		formatFinishTime(val, oldVal) {
			if(oldVal != '') this.trialsQuantity = 1
		}
	},
	validations: {
		quest: {
			title: { required }
		},
		subject: {
			required
		}
	},
	methods: {
		compararNumeros(a, b) {
			return a - b;
		},
		saveQuest() {
			if(!this.$v.$invalid && this.finishDateIsHigherThanOneDay) {
				let questForm = {
					id: this.quest.id,
					title: this.quest.title,
					startDate: this.fullSelectedStartDateTime,
					finishDate: this.fullSelectedFinishDateTime,
					subjectId: this.subject.id,
					timeInterval: this.trialsQuantity,
					trials: this.trials,
					userId: this.storedUser.id,
					subscribedUsers: this.quest.subscribedUsers,
				}
				this.showQuestOverlay = true
				this.$http.registerQuest(questForm)
				.then((response) => {
					if(response.status == 200) {
						this.$notice['success']({
							title: 'Success',
							description: 'Quest has been saved.',
							styles: { top: "4em" }
						})	
						this.$router.push({ name: 'quests-by-user' })
					} else {
						this.$notice['error']({
							title: 'Error',
							description: 'Quest could not be saved. ' + response.status,
							styles: { top: "4em" }
						})	
					}
					this.showQuestOverlay = false
				})
				.catch((error) => {
					console.log(error)
					this.$notice['error']({
						title: 'Error',
						description: 'Quest could not be saved. ' + error,
						styles: { top: "4em" }
					})	
					this.showQuestOverlay = false
				})
			} else {
				if(!this.finishDateIsHigherThanOneDay) {
					this.errorMessage = 'Date is wrong'
				} else {
					this.$v.$touch()
				}
			}
		},
		onStartDateContext(context) {
			this.startDateContext = context
		},
		onStartTimeContext(context) {
			this.startTimeContext = context
		},
		onFinishDateContext(context) {
			this.finishDateContext = context
		},
		onFinishTimeContext(context) {
			this.finishTimeContext = context
		},
		changeSelectedSubject(subjectOption) {
			let previousSubject = this.subject
			this.subject = subjectOption
			if(previousSubject != '') this.userSubjectsOptions.push(previousSubject)
			this.userSubjectsOptions = this.userSubjectsOptions.filter(element => element.id != this.subject.id)
		},
		formatDates() {
			const startDate = new Date(this.quest.startDate)
			const finishDate = new Date(this.quest.finishDate)
			this.formatStartTime = this.generateTime(startDate)
			this.formatFinishTime = this.generateTime(finishDate)
		},
		generateFormatDate(rawDate) {
			return dateUtil.formatDateAndTime(rawDate)
		},
		generateTime(rawDate) {
			return dateUtil.formatTime(rawDate)
		},
		returnToList() {
			this.$router.push({ name:'quests-by-user'})
		},
		openSubscribedUser(id) {
			console.log(id)
		},
		copySubscriptionInvitation() {
			const urlBase = process.env.VUE_APP_DEFAULT_BASE_URL
			navigator.clipboard.writeText(urlBase + '/#/quest-subscribe?questId=' + this.quest.id)

			this.$notice['success']({
				title: 'Success',
				description: 'Subscription link was copied.',
				styles: { top: "4em" }
			})	
		},
		deleteQuest() {
			this.showQuestOverlay = true
			this.$http.deleteQuest(this.quest.id)
			.then((response) => {
				if(response.status === 200) {
					this.$notice['success']({
						title: 'Success',
						description: 'Quest was successfully deleted.',
						styles: { top: "4em" }
					})
					this.$router.push({ name: 'quests-by-user' })
				} else {
					this.$notice['error']({
						title: 'Error',
						description: 'Quest could not be deleted.',
						styles: { top: "4em" }
					})
				}
				this.showQuestOverlay = false
			})
			.catch((error) => {
				this.$notice['error']({
					title: 'Error',
					description: 'Quest could not be deleted.' + error,
					styles: { top: "4em" }
				})
				this.$router.push({ name: 'quests-by-user' })
				this.showQuestOverlay = false
			})
			this.$bvModal.hide('modal-delete-quest')
		},
		finishQuest() {
			this.$bvModal.hide('modal-finish-open-quest')
			this.showQuestOverlay = true
			this.$http.finishQuest(this.quest.id)
			.then((response) => {
				this.quest = response.data
				this.showQuestOverlay = false
			})
			.catch((error) => {
				console.log(error)
				this.$notice['error']({
					title: 'Error',
					description: 'Quest could not be finished.' + error,
					styles: { top: "4em" }
				})
				this.showQuestOverlay = false
			})
		},
		updateSubscribedUsers(quest) {
			this.quest = quest
		}
	}
}
</script>

<style scoped>
</style>