<template>
	<b-row class="mt-lg-5 mt-md-3 mt-sm-3 mt-3 mx-auto">
		<b-col cols="12" xl="8" offset-xl="1" lg="8" md="12" style="line-height: normal;">
			<p id="home-main-text">Improve on your English with steady practice! Join<span style="color: #1a237e;"> English Training Quizzes</span>!</p>
		</b-col>
		<b-col cols="12" xl="3" lg="4" md="12" class="mx-auto">
			<img id="home-main-image" class="center" src="../assets/home.svg" alt="English training quizzes home image">
		</b-col>
		<b-col cols="12" lg="8" class="mx-auto mt-4">
			<AppButton label="Play!" buttonStyle="large" @appButtonClick="redirectToEnglishApp">
				Play!
			</AppButton>
			
		</b-col>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from './buttons/AppButton.vue'

export default {
	name: 'Index',
	components: {
		AppButton
	},
	computed: {
        ...mapGetters(['userIsSignedIn']),
    },
	methods: {
		redirectToEnglishApp() {
			console.log(this.userIsSignedIn)
			this.$router.push({path: '/english_app'})
		}
	},
	mounted() {
		console.log(process.env.VUE_APP_FACEBOOK_APP_ID)
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
	font-size: 4.5em!important; 
	font-weight: bold!important;
	text-shadow: 3px 3px #808080;
}

#home-main-image {
	width:300px;
	height:290px;
}

@media only screen and (max-height: 768px) {
	#home-main-text {
		font-size: 3.5em!important;
	}
	
	#home-main-image {
		width:290px;
		height:280px;
	}
}

@media only screen and (max-width: 1200px) {
	#home-main-text {
		font-size: 3.8em!important;
	}
	
	#home-main-image {
		width:290px;
		height:280px;
	}
}

@media only screen and (max-width: 992px) {
	#home-main-text {
		font-size: 2.9em!important;
		text-shadow: 2px 2px #808080;
		text-align: center;
	}
	
}

@media only screen and (max-width: 768px) {
	#home-main-text {
		font-size: 2.2em!important;
		text-shadow: 2px 2px #808080;
	}
	
}

@media only screen and (max-width: 576px) {
	#home-main-text {
		font-size: 1.8em!important;
		text-shadow: 1px 1px #808080;
	}
	#home-main-image {
		width:220px;
		height:210px;
	}
}

</style>