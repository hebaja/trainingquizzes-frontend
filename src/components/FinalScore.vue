<template>
    <b-row class="w-100 mx-auto mt-5" >
        <b-col class="text-center" cols="12">
            <h1>End of quiz</h1>
        </b-col>
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
        <b-col v-if="error" cols="12">
            <p class="text-danger">There was an error and the exercise was not saved</p>
        </b-col>
    </b-row>        
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from './buttons/AppButton.vue'

export default {
    name: 'final_score',
    data() {
        return {
            exercise: {
                id: null,
                subjectId: null,
                username: null,
                level: null,
                score: null
            },
            error: null
        }
    },
	components: {
		AppButton
	},
    computed: {
        ...mapGetters(['finalScoreObject'])
    },
    mounted() {
        if(Object.keys(this.finalScoreObject).length === 0) {
            this.$router.push({ path: '/english_app' })
        } else {
            this.tryToSaveResult()
        }
    },
    methods: {
        tryToSaveResult() {
            this.$http.post("/api/english/save-result", this.finalScoreObject)
            .then(response => {
                this.exercise = response.data
                this.$store.commit('RESET_FINAL_SCORE_OBJECT')
            }).catch((err) => {
                console.log(err)
                this.error = 'There was an error. The result was not saved.'
            })
        },
        tryAgain() {
            this.$store.dispatch('storeExercise', this.exercise)
            this.$router.push({path: '/english_app'})
        },
        backToMenu() {
            this.$router.push({path: '/english_app'})
        }
    }
    
}
</script>

<style>

</style>