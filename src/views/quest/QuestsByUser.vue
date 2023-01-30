<template>
	<b-row class="mt-4">
		<b-overlay v-if="overlayShow" :show="overlayShow" class="mt-5" />
		<div v-else>
			<b-col v-if="!userHasSingleRole" cols="12">
				<b-nav pills fill class="quest-tab">
					<b-nav-item :active="createdQuestsTabActive" :class="createdQuestsTabClass" @click="activateCreatedQuestsTab">Created quests</b-nav-item>
					<b-nav-item :active="subscribedQuestTabActive" :class="subscribedQuestsTabClass" @click="activateSubscribedQuestsTab">Subscribed quests</b-nav-item>
				</b-nav>
			</b-col>
			<b-col cols="12">
				<p v-if="errorMessage" class="text-center text-danger">{{ errorMessage }}</p>	
			</b-col>
			<div v-if="createdQuestsTabActive">
				<Pagination :payload="payload" :overlayShow="overlayShow" @shiftPage="shiftQuestsPage">
					<QuestItems :quests="payload.content" @questItemClick="openCreatedQuest($event)"/>
				</Pagination>
				<b-col cols="12" lg="8"  class="mx-auto mt-2">
					<AppButton 
						@appButtonClick="addQuest">
						Add quest
					</AppButton>
				</b-col>
			</div>
			<div v-if="subscribedQuestTabActive">
				<Pagination :payload="payload" :overlayShow="overlayShow" @shiftPage="shiftQuestsPage">
					<QuestItems :quests="payload.content" @questItemClick="openSubscribedQuest($event)"/>
				</Pagination>
			</div>
		</div>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '../../components/Pagination.vue'
import QuestItems from '../../components/lists/QuestItems.vue'
import AppButton from '../../components/buttons/AppButton.vue'
import { DateUtil } from '../../utils/DateUtil'

const dateUtil = new DateUtil()

export default {
	name: 'quests-by-user',
	data() {
		return {
			payload: '',
			overlayShow: false,
			createdQuestsTabActive: false,
			subscribedQuestTabActive: false,
			createdQuestsTabClass: '',
			subscribedQuestsTabClass: '',
			errorMessage: '',
			pageSize: 10
		}
	},
	components: {
		Pagination,
		QuestItems,
		AppButton
	},
	computed: {
		...mapGetters(['storedUser']),
		...mapGetters(['userIsTeacher']),
		...mapGetters(['userIsStudent']),
		...mapGetters(['userHasSingleRole'])
	},
	mounted() {
		this.overlayShow = true
		const page = 0
		if(this.userIsTeacher) {
			this.requestCreatedQuests(page)
		} else {
			this.requestSubscribedQuests(page)
		}
	},
	methods: {
		addQuest() {
			this.$http.getSubjects(this.storedUser.id)
			.then((response) => {
				this.$store. commit('UPDATE_STORED_USER_SUBJECTS', {
                    subjects: response.data
                })
				const today = new Date()
				const tomorrow = new Date()
				tomorrow.setDate(today.getDate() + 1)

				let createdQuest = {
					id: null,
					startDate: today,
					finishDate: tomorrow,
					subscribedUsers: [],
					subject: '',
					timeInterval: 1,
					timeUnit: 'NANOS',
					title: '',
					trials: [],
					timeZone: dateUtil.getTimeZone(),
					user: this.payload.content[0].user	
				}
				this.$router.push({ name: 'quest', params: { openQuest: createdQuest } })
			})
			.catch((error) => {
				this.$notice['error']({
					title: 'Error',
					description: 'Could not retrieve subjects. ' + error,
					styles: { top: "4em" }
				})	
			})
			
		},
		requestCreatedQuests(page) {
			this.$http.getCreatedQuests(this.storedUser.id, page, this.pageSize)
			.then((response) => {
				this.payload = response.data
				this.overlayShow = false
				this.createdQuestsTabActive = true
				this.subscribedQuestTabActive = false
				this.setCreatedQuestsTabActive()
			})
			.catch((error) => {
				console.log(error)
				this.overlayShow = false
				this.errorMessage = 'There was a problem when loading quests'
			})
		},
		requestSubscribedQuests(page) {
			this.$http.getSubscribedQuests(this.storedUser.id, page, this.pageSize)
			.then((response) => {
				this.payload = response.data
				this.overlayShow = false
				this.createdQuestsTabActive = false
				this.subscribedQuestTabActive = true
				this.setSubscribedTasksTabActive()
			})
			.catch((error) => {
				console.log(error)
				this.overlayShow = false
				this.errorMessage = 'There was a problem when loading quests'
			})
		},
		shiftQuestsPage(page) {
			this.overlayShow = true
			if(this.userIsTeacher) {
				this.requestCreatedQuests(page)
			} else {
				this.requestSubscribedQuests(page)
			}
		},
		activateCreatedQuestsTab() {
			this.requestCreatedQuests()
			this.createdQuestsTabActive = true
			this.subscribedQuestTabActive = false
			this.setCreatedQuestsTabActive()
		},
		activateSubscribedQuestsTab() {
			this.requestSubscribedQuests()
			this.createdQuestsTabActive = false
			this.subscribedQuestTabActive = true
			this.setSubscribedTasksTabActive()
		},
		setCreatedQuestsTabActive() {
			this.createdQuestsTabClass = 'active'
			this.subscribedQuestsTabClass = 'inactive'
		},
		setSubscribedTasksTabActive() {
			this.createdQuestsTabClass = 'inactive'
			this.subscribedQuestsTabClass = 'active'
		},
		openCreatedQuest(questId) {
			this.$http.getQuest(questId)
			.then((response) => {
				this.$router.push({ name: 'quest', params: { openQuest: response.data } })
			})
			.catch((error) => {
				console.log(error)
			})
		},
		openSubscribedQuest(questId) {
			this.$http.getQuest(questId)
			.then((response) => {
				this.$router.push({ name: 'subscribed-quest', params: { openQuest: response.data } })
			})
			.catch((error) => {
				console.log(error)
			})
		}
	}
}
</script>

<style>
	.quest-tab > li > a {
		color: #666666!important;
	}

	.quest-tab > .inactive > a:hover  {
		color: #333333!important;
		transform: scale(1.02);
	}

	.quest-tab > .active > a {
		color: #333333!important;
		background-color: #ffa726!important;	
	}
	
</style>