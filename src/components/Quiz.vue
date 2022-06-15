<template>
    <div id="quiz">
		<b-overlay v-if="overlayShow" :show="overlayShow" rounded="lg" class="mt-5" />
		<div v-if="errorMessage" class="mt-4">
			<p class="text-danger text-center">{{ errorMessage }}</p>
		</div>
		<div v-if="reducedListTasks">
			<AppQuiz :tasksList="reducedListTasks" :subjectId="subjectId" />
		</div>
		
    </div>
</template>

<script>
import AppQuiz from './shared/AppQuiz.vue'

export default {
	name: 'quiz',
	props: ['subjectId'],
	components: { AppQuiz },
	data() {
		return {
			tasks: null,
			reducedListTasks: null,
			errorMessage: '',
			overlayShow: false
		}
	},
	mounted() {
		this.overlayShow = true
		this.$http.get("/api/english/task?subjectId=" + this.subjectId)
		.then(response => {
			this.tasks = response.data
			this.createReducedTasksList()
		})
		.catch(error => {
			console.log(error)
			this.errorMessage = 'The quiz could not be loaded'
		})
		this.overlayShow = false
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