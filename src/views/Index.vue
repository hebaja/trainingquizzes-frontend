<template>
	<b-row class="mt-lg-4 mt-3 mx-auto">
		<b-col cols="12" style="line-height: normal;">
			<p id="home-main-text">Assess the knowledge and understanding of your students with steady practice! Join <span style="color: #1a237e;">Training Quizzes</span>!</p>
		</b-col>
		<b-col cols="10" class="mx-auto mt-2">
			<AppButton @appButtonClick="subscribeToQuest">
				Subscribe to quest
			</AppButton>
		</b-col>
		<b-col cols="12" xl="10" class="mt-4 mx-auto">
			<AppSearch :isAllSubjects="true" :inputLabel='mobileUtil.isMobile() ? "Text here" : "What are you looking for?"'/>
		</b-col>
		<b-col cols="12" xl="10" class="mt-3 mx-auto">
			<Pagination title="Latest subjects:" :payload="payload" @shiftPage="shiftLatestSubjectsPage">
				<SubjectItems :subjects="payload.content" :overlayShow="overlayShow" @subjectItemClick="open($event)"/>
			</Pagination>
		</b-col>		
		<b-col cols="12" class="mx-auto mt-2">
			<img id="home-main-image" class="center" src="../assets/home.svg" alt="English training quizzes home image">
		</b-col>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '../components/Pagination.vue'
import AppSearch from '../components/AppSearch.vue'
import SubjectItems from '../components/lists/SubjectItems.vue'
import { MobileUtil } from '../utils/MobileUtil'
import AppButton from '../components/buttons/AppButton.vue'

const mobileUtil = new MobileUtil()

export default {
	name: 'index',
	components: {
		Pagination,
		AppSearch,
		SubjectItems,
		AppButton
	},
	data() {
		return {
			payload: {},
			pageSize: 6,
			overlayShow: false,
			mobileUtil: mobileUtil
		}
	},
	computed: {
		...mapGetters(['userIsSignedIn'])
	},
	mounted() {
		const page = 0
		this.overlayShow = true
		this.requestSubjects(page)
	},
	methods: {
		open(subject) {
			this.$router.push({ name: 'subject-profile', params: { subject: subject } })
			this.$store.dispatch('defineUserAuthor', subject.user)
		},	
		shiftLatestSubjectsPage(page) {
			this.overlayShow = true
			this.requestSubjects(page)
		},
		requestSubjects(page) {
			this.$http.getReducedSubjects(page, this.pageSize, 'creationDate,desc')
			.then((response) => {
				this.payload = response.data
				this.overlayShow = false
			})
			.catch((error) => {
				console.log(error)
				this.overlayShow = false
			})
		},
		redirectToEnglishApp() {
			this.$router.push({ name: 'quiz-by-levels' })
		},
		isMobile() {
			if( screen.width <= 760 ) {
				return true;
			}
			else {
				return false;
			}
		},
		subscribeToQuest() {
			this.$router.push({ name: 'quest-pin-insert' })
		}
	}
}

</script>

<style scoped>
@charset "UTF-8";

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

#home-main-text {
	font-size: 3.5em!important; 
	font-weight: bold!important;
	text-shadow: 3px 3px #808080;
	text-align: center;
}

#home-main-image {
	width:230px;
	height:220px;
}

@media only screen and (max-width: 1200px) {
	#home-main-text {
		font-size: 3em!important;
	}
	
	#home-main-image {
		width:220px;
		height:210px;
	}
}

@media only screen and (max-width: 992px) {
	#home-main-text {
		font-size: 2.3em!important;
		text-shadow: 2px 2px #808080;
		text-align: center;
	}

	#home-main-image {
		width:190px;
		height:180px;
	}
}

@media only screen and (max-width: 576px) {
	#home-main-text {
		font-size: 1.6em!important;
		text-shadow: 1px 1px #808080;
	}
	#home-main-image {
		width:180px;
		height:170px;
	}
}

</style>