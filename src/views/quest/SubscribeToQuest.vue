<template>
	<b-overlay v-if="overlayShow" :show="overlayShow" rounded="lg" class="mt-5" />
	<b-row v-else>
		<b-col cols="12">
			<p v-if="errorMessage" class="text-center text-danger">{{ errorMessage }}</p>	
		</b-col>
		<b-card v-if="quest" class="mt-4">
			<b-row >
				<b-col cols="6">
					<h4><b>{{ quest.title }}</b></h4>
				</b-col>
				<b-col cols="6" class="d-flex justify-content-end">
					<h4>{{ quest.user.username }}</h4><b-avatar :src="quest.user.pictureUrl"></b-avatar>
				</b-col>
				<b-col cols="12">
					<h5><font-awesome-icon icon="fa-solid fa-book" /> {{ quest.subject.title }} - Level: {{ quest.subject.level }}</h5>
				</b-col>
				<b-col cols="12">
					<font-awesome-icon icon="fa-solid fa-calendar-days" class="me-1"/>From <u>{{ formatStartDate }}</u> to <u>{{ formatFinishDate }}</u>
				</b-col>
				<b-col cols="12" class="mt-3">
					<AppButton v-if="userIsAlreadySubscribed" disabled="true" >User is already subscribed</AppButton>
					<AppButton v-else @appButtonClick="subscribe">Subscribe to quest</AppButton>
				</b-col>
			</b-row>
		</b-card>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from '../../components/buttons/AppButton.vue'
import { DateUtil } from '../../utils/DateUtil'
const dateUtil = new DateUtil()

export default {
	name: 'quest-subscribe',
	props: ['questId'],
	components: { AppButton },
	computed: {
		...mapGetters(['storedUser']),
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
		}
	},
	data() {
		return {
			quest: '',
			overlayShow: false,
			errorMessage: ''
		}
	},
	mounted() {
		if(this.$route.query.questId) {
			this.overlayShow = true
			const questId = this.$route.query.questId
			this.$http.getQuest(questId)
			.then((response) => {
				this.quest = response.data
				this.overlayShow = false
			})
			.catch((error) => {
				console.log(error)
				this.overlayShow = false
			}
		)}
	},
	methods: {
		subscribe() {
			const subscribeForm = {
				questId: this.quest.id,
				userId: this.storedUser.id
			}
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
			})
			.catch((error) => {
				console.log(error)
				this.errorMessage = 'There was an error when trying to subscribe to quest'
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