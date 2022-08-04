<template>
    <div id="regular-quiz">
		<b-overlay v-if="overlayShow" :show="overlayShow" rounded="lg" class="mt-5" />
		<div v-if="errorMessage" class="mt-4">
			<p class="text-danger text-center">{{ errorMessage }}</p>
		</div>
		<div v-if="reducedListTasks">
			<Quiz :tasksList="reducedListTasks" :subjectId="subjectId" />
		</div>
		
    </div>
</template>

<script>
import Quiz from '../../components/Quiz.vue'

export default {
	name: 'regular-quiz',
	props: ['subjectId'],
	components: { Quiz },
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
		this.$http.getRegularQuiz(this.subjectId)
		.then(response => {
			this.tasks = response.data
			this.createReducedTasksList()
			this.overlayShow = false
		})
		.catch(error => {
			console.log(error)
			this.errorMessage = 'The quiz could not be loaded'
			this.overlayShow = false	
		})
	},
	methods: {
		createReducedTasksList() {
			if(this.tasks != null) {
				this.shuffle(this.tasks)
				this.reducedListTasks = this.tasks.splice(0, 10)
			}
		},

		shuffle(tasks) {
			let currentIndex = tasks.length,  randomIndex
			
			while (currentIndex != 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--

				[tasks[currentIndex], tasks[randomIndex]] = [tasks[randomIndex], tasks[currentIndex]]
			}
			return tasks;
		}
	}
}
</script>

<style>

</style>