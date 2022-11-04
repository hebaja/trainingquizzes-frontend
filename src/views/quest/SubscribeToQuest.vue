<template>
	<b-row>
		<b-col cols="12">
			<p v-if="errorMessage" class="text-center text-danger">{{ errorMessage }}</p>	
		</b-col>
		<b-card v-if="quest" class="mt-4">
			<b-row >
				<b-col cols="12" sm="6" class="text-center text-sm-start">
					<h4><b>{{ quest.title }}</b></h4>
				</b-col>
				<b-col cols="12" sm="6" offset="5" offset-sm="0" class="d-sm-flex justify-content-end">
					<div>
						<b-avatar :src="quest.user.pictureUrl"></b-avatar>
						<h4>{{ quest.user.username }}</h4>
					</div>
				</b-col>
				<b-col cols="12">
					<h5><font-awesome-icon icon="fa-solid fa-book" /> {{ quest.subject.title }} - Level: {{ quest.subject.level }}</h5>
				</b-col>
				<b-col cols="12">
					<font-awesome-icon icon="fa-solid fa-calendar-days" class="me-1"/>From <u>{{ formatStartDate }}</u> to <u>{{ formatFinishDate }}</u>
				</b-col>
				<b-col cols="12" class="mt-3">
					<b-overlay :show="overlayShow" spinner-small class="mt-5" >
						<AppButton v-if="userIsAlreadySubscribed" disabled="true" >User is already subscribed</AppButton>
						<AppButton v-else @appButtonClick="subscribe">Subscribe to quest</AppButton>
					</b-overlay>
				</b-col>
			</b-row>
		</b-card>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateUtil } from '../../utils/DateUtil'
import AppButton from '../../components/buttons/AppButton.vue'

const dateUtil = new DateUtil()

export default {
	name: 'quest-subscribe',
	components: { AppButton },
	props: {
		receivedQuest: {
			type: Object
		}
	},
	data() {
		return {
			quest: '',
			mobileSubscribeOnWeb: false,
			overlayShow: false,
			errorMessage: ''
		}
	},
	computed: {
		...mapGetters(['storedUser']),
		...mapGetters(['storedSubscribeQuestId']),
		formatStartDate() {
			const date = new Date(this.quest.startDate)
			return this.generateFormatDate(date)
		},
		formatFinishDate() {
			const date = new Date(this.quest.finishDate)
			return this.generateFormatDate(date)
		},
		userIsAlreadySubscribed() {
			const subscribedUsers = this.quest.subscribedUsers
			let isSubscribed = false
			subscribedUsers.forEach(user => {
				if(user.id === this.storedUser.id) isSubscribed = true
			})
			return isSubscribed
		},
	},
	mounted() {
		if(this.storedSubscribeQuestId) {
			this.$http.getQuest(this.storedSubscribeQuestId)
			.then((response) => {
				this.quest = response.data
				this.$store.commit('RESET_SUBSCRIBE_QUEST_ID')
			})
			.catch((error) => {
				console.log(error)
				this.errorMessage = 'Could not load quest'
			})	
		} 
		else if(this.receivedQuest) this.quest = this.receivedQuest
		else this.errorMessage = 'Could not load quest'
		
	},
	methods: {
		subscribe() {
			const subscribeForm = {
				questId: this.quest.id,
				userId: this.storedUser.id
			}
			this.overlayShow = true;
			this.$http.subscribeToQuest(subscribeForm)
			.then((response) => {
				if(response.status == 200) {
					this.$notice['success']({
						title: 'Success',
						description: 'Subscription done.',
						styles: { top: "4em" }
					})
					this.$router.push({ name: 'quests-by-user' })
				} else {
					this.errorMessage = 'There was an error trying to save the quest'
				}
				this.overlayShow = false;
			})
			.catch((error) => {
				console.log(error)
				this.errorMessage = 'There was an error when trying to subscribe to quest'
				this.overlayShow = false;
			})
		},
		generateFormatDate(rawDate) {
			return dateUtil.formatDateAndTime(rawDate)
		}
	}
}
</script>

<style>

</style>