<template>
	<b-row>

		<b-overlay :show="overlayShow" rounded="sm" opacity="0.9" variant="transparent" blur="5px" >
		
		<b-form @submit.prevent="saveSubject">
			<b-row class="mx-auto">
				<b-col cols="12" class="mt-3 d-md-none d-sm-none d-none d-lg-block" >
					<label for="form-input-subject-title">Subject title:</label>
				</b-col>
				<b-col cols="12" lg="10" class="mt-3 mt-lg-0">
					<b-input-group>
						<span class="input-group-text" id="subject-title-addon"><font-awesome-icon class="ms-1" icon="fa-solid fa-book" /></span>
						<b-form-input
							id="form-input-subject-title"
							v-model="editSubject.title"
							class="shadow"
							type="text"
							aria-describedby="subject-title-addon"
							placeholder="Insert subject title">
						</b-form-input>
						<span class="input-group-text" id="add-task-to-subject">
								<b-link 
									href="#" 
									class="custom-link" 
									@click="addTask" 
									data-toggle="tooltip" 
									data-placement="right" 
									title="Add a new task">
										<font-awesome-icon class="ms-1" icon="fa-solid fa-plus" />
								</b-link>
							</span>
						<b-form-invalid-feedback :state="!$v.editSubject.title.$error">
							This field is required
						</b-form-invalid-feedback>
					</b-input-group>
				</b-col>
				<b-col cols="12" lg="2" class="mt-3 mt-lg-0">
					<b-button-group class="shadow col-12">
						<b-button 
							v-for="(level, index) in levels" 
							style="width: 5em;"
							:key="level.levelType" 
							:variant="level.variant"
							@click="setLevel(index, level.levelType)">
								{{ level.label }}
						</b-button>
					</b-button-group>
				</b-col>
				<b-col cols="12" class="mx-auto mt-2">
					<hr />
				</b-col>
				<div v-for="(task, index) in editSubject.tasks" :key="task.id">
					<b-col cols="12" lg="11" class="mx-auto mt-2">
						<b-input-group>
							<span class="input-group-text" :id="index"><font-awesome-icon class="ms-1" icon="fa-solid fa-book-open" /></span>
							<b-form-input
								v-model="task.prompt"
								class="shadow"
								type="text"
								:aria-describedby="index"
								placeholder="Insert prompt of task">
							</b-form-input>
							<span class="input-group-text" :id="index">
								<b-link 
									href="#" 
									class="custom-link" 
									@click="addOption(index)" 
									data-toggle="tooltip" 
									data-placement="right" 
									title="Add an option">
										<font-awesome-icon class="ms-1" icon="fa-solid fa-plus" />
								</b-link>
							</span>
							<span class="input-group-text" :id="index">
								<b-form-checkbox 
									data-toggle="tooltip" data-placement="right" title="Check to shuffle tasks"
									v-model="task.shuffleOptions"
									name="check">
								</b-form-checkbox>
							</span>
							<span class="input-group-text" :id="index">
								<b-link 
									href="#" 
									class="custom-link" 
									@click="removeTask(index)" 
									data-toggle="tooltip" 
									data-placement="right" 
									title="Remove this task?">
										<font-awesome-icon class="ms-1" icon="fa-solid fa-trash" />
								</b-link>
							</span>
							<b-form-invalid-feedback :state="!$v.editSubject.tasks.$each[index].prompt.$error">
								This field is required
							</b-form-invalid-feedback>
						</b-input-group>
					</b-col>
					<div v-for="(option, optionIndex) in task.options" :key="optionIndex">
						<b-row>
							<b-col cols="10" lg="9" class="mx-auto mt-1">
								<b-input-group>
									<span class="input-group-text" :id="optionIndex">{{ optionIndex + 1 }}</span>
									<b-form-input
										v-model="option.prompt"
										class="shadow"
										type="text"
										:aria-describedby="optionIndex"
										placeholder="Insert prompt of option">
									</b-form-input>
									<span class="input-group-text" :id="optionIndex">
										<b-form-checkbox 
											data-toggle="tooltip" data-placement="right" title="Check if correct"
											v-model="option.correct"
											name="check-button" 
											switch>
										</b-form-checkbox>
									</span>
									<span class="input-group-text" :id="optionIndex">
										<b-link 
											href="#" 
											class="custom-link" 
											@click="removeOption(index, optionIndex)" 
											data-toggle="tooltip" 
											data-placement="right" 
											title="Remove this option?">
												<font-awesome-icon class="ms-1" icon="fa-solid fa-trash-alt" />
										</b-link>
									</span>
									<b-form-invalid-feedback :state="!$v.editSubject.tasks.$each[index].options.$each[optionIndex].prompt.$error">
										This field is required
									</b-form-invalid-feedback>
								</b-input-group>
							</b-col>
						</b-row>
					</div>
					<hr />
				</div>

				<b-col cols="9" class="mt-2 mx-auto">
					<b-overlay :show="buttonOverlayShow" spinner-small>
						<AppButton class="col-12"  @appButtonClick="saveSubject" buttonStyle="save">Save Subject</AppButton>
					</b-overlay>
				</b-col>
				<b-col v-if="!newSubject" cols="12" class="text-center mt-3 text-danger">
					<h3>
						<font-awesome-icon
							icon="fa-solid fa-trash"
							@click.prevent="$bvModal.show('modal-delete-subject-request')"
							v-b-tooltip.hover title="Delete this subject"
							style="cursor: pointer;"
						/>
					</h3>
				</b-col>
				<Modal 
					:modalId="'modal-delete-subject-request'" 
					:message="'Do you really want to delete this subject'"
					@componentFunction="deleteSubject"
					:confirmButtonLabel="'Delete'" >
				</Modal>
			</b-row>
		</b-form>
		</b-overlay>
	</b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import AppButton from '../components/buttons/AppButton.vue'
import Modal from '../components/Modal.vue'

export default {
	name: 'subject',
	props: {
		subjectId: Number,
		newSubject: Object
	},
	components: {
		AppButton,
		Modal
	},
	data() {
		return {
			overlayShow: true,
			buttonOverlayShow: false,
			editSubject: '',
			levels: [
				{ label:'Easy', levelType:'EASY', variant: 'outline-secondary' },
				{ label:'Medium', levelType:'MEDIUM', variant: 'outline-secondary' },
				{ label:'Hard', levelType:'HARD', variant: 'outline-secondary' }
			]
		}
	},
	validations: {
		editSubject: {
			title: {
				required
			},
			tasks: {
				$each: {
					prompt: {
						required
					},
					options: {
						$each: {
							prompt: {
								required
							}
						}
					}
				}
			}
		},
	},
	mounted() {
		this.overlayShow = true
		if(this.newSubject) this.configureNewSubject()
		else if(this.subjectId) this.requestSubject(this.subjectId)
		else this.requestSubject(this.storedEditSubjectId)
	},
	computed: {
		...mapGetters(['storedEditSubjectId']),
	},
	methods: {
		requestSubject(subjectId) {
			this.$http.getSubject(subjectId)
			.then((response) => {
				this.editSubject = response.data
				this.configureSubjectLevel()
				this.overlayShow = false
			})
			.catch((error) => {
				console.log(error)
				this.$notice['error']({
					title: 'Attention',
					description: 'It was not possible to load subject. ' + error
				})
				this.overlayShow = false
			})
		},
		configureNewSubject() {
			this.editSubject = this.newSubject
			this.configureSubjectLevel()
			this.overlayShow = false
		},
		configureSubjectLevel() {
			if(this.editSubject.level === 'EASY') this.levels[0].variant = 'success'
			if(this.editSubject.level === 'MEDIUM') this.levels[1].variant = 'warning'
			if(this.editSubject.level === 'HARD') this.levels[2].variant = 'danger'
		},	
		setLevel(index, levelType) {
			let variant
			if(index === 0) variant = 'success'
			else if(index === 1) variant = 'warning'
			else variant = 'danger'
			this.levels.forEach(level => level.variant = 'outline-secondary')
			this.levels[index].variant = variant
			this.editSubject.level = levelType
		},
		addTask() {
			this.editSubject.tasks.unshift({
				prompt: '',
				shuffleOptions: false,
				options: [
					{ prompt: '', correct: false },
					{ prompt: '', correct: false }
				]
			})
		},
		addOption(index) {
			if(this.editSubject.tasks[index].options.length < 5) {
				this.editSubject.tasks[index].options.push({prompt: '', correct: false})
			} else {
				this.$notice['error']({
					title: 'Attention',
					description: 'You must not have more than 5 options.',
					styles: { top: '4em' }
				})	
			}
		},
		removeTask(index) {
			if(this.editSubject.tasks.length > 10) {
				this.editSubject.tasks.splice(index, 1)
			} else {
				this.$notice['error']({
					title: 'Attention',
					description: 'A subject must have at least 10 tasks.',
					styles: { top: "4em" }
				})
			}
		},
		removeOption(index, optionIndex) {
			if(this.editSubject.tasks[index].options.length > 2) {
				this.editSubject.tasks[index].options.splice(optionIndex, 1)
			} else {
				this.$notice['error']({
					title: 'Attention',
					description: 'You must have at least 2 options.'
				})	
			}
		},
		deleteSubject() {
			let deleteSubjectId = null
			if(this.subjectId) deleteSubjectId = this.subjectId
			else deleteSubjectId = this.storedEditSubjectId

			this.$bvModal.hide('modal-delete-subject-request')

			if(deleteSubjectId) {

				this.overlayShow = true

				setTimeout(() => {


					this.$http.deleteSubject(deleteSubjectId)
					.then((response) => {
						console.log(response.code)
						this.$router.push({ name: 'subjects' })
						this.overlayShow = false
					})
					.catch((error) => {
						console.log(error.request)
						this.$bvModal.hide('modal-delete-subject')
						this.overlayShow = false
					})


				}, 3000)

			} else {
				this.$notice['error']({
					title: 'Attention',
					description: 'Could not delete subject.',
					styles: { top: "4em" }
				})
			}
		},
		saveSubject() {
			let optionsAreValid = true
			if(!this.$v.$invalid) {
				for (let j = 0; j < this.editSubject.tasks.length; j++) {
					let k = 0
					let thereIsCorrect = false
					for (k; k < this.editSubject.tasks[j].options.length; k++) {
						if(this.editSubject.tasks[j].options[k].correct) {
							thereIsCorrect = true
						}
					}
					if(!thereIsCorrect) {
						optionsAreValid = false
						break
					}
				}
				if(optionsAreValid) {
					this.buttonOverlayShow = true
					setTimeout(() => {
						this.$http.updateSubject(this.editSubject)
						.then(() => {
							this.buttonOverlayShow = false
							this.$router.push({ name: 'subjects' })
						})
						.catch((error) => {
							this.buttonOverlayShow = false
							this.$notice['error']({
								title: 'Attention',
								description: 'Could not save subject. ' + error,
								styles: { top: "4em" }
							})
						})

					}, 3000)
				} else {
					this.$notice['error']({
						title: 'Attention',
						description: 'Each task must have at least one correct option.'
					})
				}
			} else {
				this.$v.$touch()
				if(!this.$v.editSubject.title.required) {
					this.$notice['error']({
						title: 'Attention',
						description: 'You must insert a subject title.'
					})
					return
				} 
				for (var i = 0; i < this.subject.tasks.length; i++) {
					if(this.editSubject.tasks[i].prompt === '') {
						this.$notice['error']({
							title: 'Attention',
							description: 'You must not leave a task prompt empty.'
						})
						return
					} 
				}
				for (var j = 0; j < this.editSubject.tasks.length; j++) {
					var k = 0
					for (k; k < this.editSubject.tasks[j].options.length; k++) {
						if(this.editSubject.tasks[j].options[k].prompt === '') {
							this.$notice['error']({
								title: 'Attention',
								description: 'You must not leave an option prompt empty.'
							})	
							return
						}
					}
				}
			}
		}
	}
}
</script>

<style>

</style>