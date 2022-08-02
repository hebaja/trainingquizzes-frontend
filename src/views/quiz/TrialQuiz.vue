<template>
    <div id="trial-quiz">
		<b-overlay v-if="overlayShow" :show="overlayShow" rounded="lg" class="mt-5" />
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
			overlayShow: false
		}
	},
	methods: {
		createReducedTasksList() {
			if(this.tasks != null) {
				this.reducedListTasks = this.tasks.slice().sort(() => Math.random() - 0.5)
				this.reducedListTasks.splice(0, 10)
			}
		}
	}

}
</script>

<style>

</style>