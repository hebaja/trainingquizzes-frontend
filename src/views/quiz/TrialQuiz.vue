<template>
    <div id="trial-quiz">
		<div v-if="errorMessage" class="mt-4">
			<p class="text-danger text-center">{{ errorMessage }}</p>
		</div>
		<div v-if="trial.tasks">
			<Quiz :tasksList="trial.tasks" :trialId="trial.id" :currentScore="trial.score" :tasksIndex="trial.tasksIndex" :isTrial="true" :questId="questId"/>
		</div>
		
    </div>
</template>

<script>
import Quiz from '../../components/Quiz.vue'

export default {
	name: 'trial-quiz',
	props: {
		trial: Object,
		questId: Number
	},
	components: { Quiz },
	data() {
		return {
			tasks: null,
			reducedListTasks: null,
			errorMessage: '',
		}
	}
}
</script>

<style>

</style>