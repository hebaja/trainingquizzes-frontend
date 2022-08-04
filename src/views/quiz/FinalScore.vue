<template>
	<b-row class="w-100 mx-auto mt-5" >
		<b-col class="text-center" cols="12">
			<h1>End of quiz</h1>
		</b-col>
		<div v-if="errorMessage">
			<b-col cols="12">
				<p class="text-danger text-center">{{ errorMessage }}</p>
			</b-col>
		</div>
		<div v-else>
			<b-overlay :show="finalScoreOverlayShow" rounded="sm">
				<b-col class="text-center mt-2" cols="12">
					<h2> Final score: {{ exercise.score }} </h2>
				</b-col>
				<b-col class="mx-auto mt-2" cols="8">
					<AppButton
						class="mt-2"
						@appButtonClick="tryAgain">
						Try again
					</AppButton>
				</b-col>
				<b-col class="mx-auto mt-2" cols="8">
					<AppButton
						class="mt-2"
						@appButtonClick="backToMenu">
						Back to main menu
					</AppButton>
				</b-col>
			</b-overlay>
		</div>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from '../../components/buttons/AppButton.vue'

export default {
	name: 'final_score',
	data() {
		return {
			finalScoreOverlayShow: false,
			errorMessage: '',
			exercise: {
				id: null,
				subjectId: null,
				username: null,
				level: null,
				score: null
			},
		}
	},
	props: {
		subjectId: Number
	},
	components: {
		AppButton
	},
	computed: {
		...mapGetters(['finalScoreObject'])
	},
	mounted() {
		if(Object.keys(this.finalScoreObject).length === 0) {
			this.$router.push({ name: 'quiz-by-levels' })
		} else {
			this.tryToSaveResult()
		}
	},
	methods: {
		tryToSaveResult() {
			this.finalScoreOverlayShow = true
			this.$http.saveResult(this.finalScoreObject)
			.then(response => {
				this.exercise = response.data
				this.$store.commit('RESET_FINAL_SCORE_OBJECT')
				this.finalScoreOverlayShow = false
			}).catch((error) => {
				console.log(error)
				this.errorMessage = 'There was an error and the result was not saved'
				this.finalScoreOverlayShow = false
			})
		},
		tryAgain() {
			this.$store.dispatch('storeExercise', this.exercise)
			this.$router.push({ name: 'regular-quiz', params: { subjectId: this.subjectId }})
		},
		backToMenu() {
			this.$router.push({ name: 'quiz-by-levels' })
		}
	}

}
</script>

<style>

</style>