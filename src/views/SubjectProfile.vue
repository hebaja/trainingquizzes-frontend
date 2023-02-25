<template>
	<b-row class="mt-4">
		<b-col cols="12">
			<div v-if="errorMessage" class="mt-4">
				<p class="text-danger text-center">{{ errorMessage }}</p>
			</div>	
		</b-col>
		<b-overlay :show="overlayShow" bg-color="#f9fbe7" spinner-small>
			<b-col cols="12" class="text-center">
				<h3><font-awesome-icon class="me-1" icon="fa-solid fa-book"/>{{ subject.title }}</h3>
			</b-col>
			<b-col cols="12" class="text-center">
				Level: <span>{{ subject.level }}</span>
			</b-col>
			<b-col cols="12" class="text-center">
				<span><font-awesome-icon icon="fa-solid fa-clock" />&nbsp; Created on {{ formatDate(subject.creationDate) }}</span>
			</b-col>
			<b-col cols="12" class="text-center">
				Made by: <span>{{ subject.user.username }}<b-avatar :src="subject.user.pictureUrl"></b-avatar></span>
			</b-col>
			<b-col v-if="userIsStudent" cols="6" offset="3" class="mt-2">
				<AppButton @appButtonClick="play">Play</AppButton>
			</b-col>
			<b-col cols="12" class="text-center mt-3">
				<b-button @click="favorite" :variant="defineVariant" class="btn-circle btn-md"><font-awesome-icon icon="fa-solid fa-heart" style="font-size: 2.5em;"/></b-button>
			</b-col>
			<b-list-group class="mt-3">
				<b-list-group-item 
					v-for="task in tasks" 
					:key="task.id" 
					v-b-toggle 
					:href="generateReference(task.id)" 
					@click.prevent
				>
					<b>{{ task.prompt }}</b>
					<b-collapse :id="generateId(task.id)">
						<span v-for="(option, index) in task.options" 
							:key="index"
							:class="generateColor(option.correct)">
							<font-awesome-icon :icon="generateIcon(option.correct)" /> 
								{{ option.prompt }}
							<br>
						</span>
					</b-collapse>
				</b-list-group-item>
			</b-list-group>
		</b-overlay>
	</b-row>
</template>

<script>
import AppButton from '../components/buttons/AppButton.vue';
import { DateUtil } from '../utils/DateUtil';
import { mapGetters } from 'vuex'

const dateUtil = new DateUtil()

export default {
	name:'subject-profile',
	props: {
		subject: {
			type: Object,
			required: true
		}
	},
	components: {
		AppButton
	},
	data() {
		return {
			tasks: '',
			errorMessage: '',
			overlayShow: false,
			key: 0
		}
	},
	computed: {
		...mapGetters(['userIsTeacher']),
		...mapGetters(['userIsStudent']),
		...mapGetters(['userIsSignedIn']),
		...mapGetters(['storedUser']),
		...mapGetters(['userFavoriteSubjectsIds']),
		isFavorite() {
			return this.userFavoriteSubjectsIds.includes(this.subject.id)
		},
		defineVariant() {
			if(this.isFavorite) return 'danger'
			else return 'secondary'
		}
	},
	mounted() {
		if(this.userIsTeacher) {
			this.$http.getTasksBySubject(this.subject.id)
			.then((response) => {
				this.tasks = response.data
			})
			.catch((error) => console.log(error))
		}
	},	
	methods: {
		play() {
			this.$router.push({ name: 'regular-quiz', params: { subjectId: this.subject.id } })
		},
		favorite() {
			if(this.userIsSignedIn) {
				this.overlayShow = true

				let form = {
					userId: this.storedUser.id,
					subjectId: this.subject.id
				}

				this.$http.favoriteSubject(form)
				.then((response) => {
					if(response.status == 200) {
						this.$store.commit('UPDATE_STORED_USER', {
							user: response.data
						})
						if(this.isFavorite) {
							this.$notice['success']({
								title: 'Success',
								description: 'Subject was added to your favorites.',
								styles: { top: "4em" }
							})
						} else {
							this.$notice['info']({
								title: 'Info',
								description: 'Subject was removed from your favorites.',
								styles: { top: "4em" }
							})
						}
					} else if(response.status == 204) {
						this.$notice['warning']({
							title: 'Warning',
							description: 'Subject already belongs to user.',
							styles: { top: "4em" }
						})
					}
					this.overlayShow = false
				})
				.catch((error) => {
					console.log(error)
					this.overlayShow = false
					this.$notice['error']({
						title: 'Error',
						description: 'There was a problem. ' + error,
						styles: { top: "4em" }
					})
				})
			} else {
				this.$notice['warning']({
					title: 'Warning',
					description: 'Sign in to favorite a subject.',
					styles: { top: "4em" }
				})
			}
		},
		formatDate(creationDate) {
			return dateUtil.formatDate(creationDate)
        },
		generateId(number) {
			return 'task-' + number.toString()
		},
		generateReference(number) {
			return '#task-' + number.toString()
		},
		generateIcon(correct) {
			if(correct) return 'fa-solid fa-circle-check'
			else return 'fa-solid fa-circle-xmark'
		},
		generateColor(correct) {
			if(correct) return 'text-success'
			else return 'text-danger'
		}

	}
}
</script>

<style>
	.btn-circle.btn-md {
		width: 50px;
		height: 50px;
		padding: 7px 10px;
		border-radius: 25px;
		font-size: 10px;
		text-align: center;
	}
</style>