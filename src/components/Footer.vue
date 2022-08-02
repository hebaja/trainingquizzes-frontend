<template>
        <b-row id="footer" class="fixed-bottom" style="background-color: #ffc266!important;">
            <b-col md="6" sm="12" class="mt-md-3 mt-sm-2 mt-2 d-none d-sm-none d-md-block">
                <p id="footer-header">English Training Quizzes</p>
                <p id="footer-text">Study English more effectively.</p>
            </b-col>
            <b-col md="6" sm="12" class="mt-3 mt-md-1 mt-lg-1">
                <div id="button-playstore">
                    <a
						href="https://play.google.com/store/apps/details?id=br.com.hebaja.englishtrainingquizzes&amp;pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
						<img 
							id="android-badge" 
							alt='Get it on Google Play' 
							src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/>
					</a>
                </div>
            </b-col>
        </b-row>
</template>

<script>
export default {

}
</script>

<style scoped>
#android-badge {
	height: 5.5em;
}

#footer-header {
	font-size: 1.2em;
	font-weight: bold;
}

#footer {
	/* height: 7.5em; */
	text-align: center;
}

#footer-text {
	margin-top: -.5em;
}

@media only screen and (max-width: 991px) {
	#footer-text {
		font-size: .9em;
		margin-top: 1em;
	}

	#footer {
		height: 6em;
	}
}

@media only screen and (max-width: 767px) {
	#footer-text {
		margin-top: -.8em;
	}
	
	#footer {
		height: 4em;
	}
	
	#android-badge {
		height: 4em;
	}
	
	#button-playstore {
		margin-top: -1em;
	}
}

@media only screen and (max-width: 575px) {
	#footer {
		height: 4em;
	}
}
</style>