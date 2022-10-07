<template>
	<b-row>
		<div v-if="isMobile">
			<AppButton @appButtonClick="goToAndroidApp" class="mt-3">Subscribe using our Android app <font-awesome-icon icon="fa-brands fa-android" /></AppButton>
			<AppButton @appButtonClick="subscribeOnWeb" class="mt-3">Subscribe on the web <font-awesome-icon icon="fa-solid fa-globe" /></AppButton>
		</div>
	</b-row>
</template>

<script>
import { MobileUtil } from '../../utils/MobileUtil'

const mobileUtil = new MobileUtil()

export default {
	name: 'quest-subscribe-filter',
	data() {
		return {
			questId: Number
		}
	},
	mounted() {
		if(this.$route.query.questId) {
			this.questId = this.$route.query.questId
			this.$store.commit('DEFINE_SUBSCRIBE_QUEST_ID', this.questId)
			if(!this.isMobile) this.subscribeOnWeb()
		}
	},
	computed: {
		isMobile() {
			return mobileUtil.isMobile()
		}
	},
	methods: {
		goToAndroidApp() {
			window.location.href = 'http://tq-androidapp-user.com?questId=' + this.questId
		},
		subscribeOnWeb() {
			this.$router.push({ name: 'quest-subscribe', params: { questId: this.questId } })
		}
	}
}
</script>

<style>

</style>