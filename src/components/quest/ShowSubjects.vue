<template>
	<div>
		<b-col cols="10" class="mx-auto mt-3">
			<AppButton v-b-toggle.collapse-show-subjects @click.prevent="fetchSubjects">
				{{ buttonLabel }}
			</AppButton>
		</b-col>
		<b-col cols="10" class="mx-auto mt-3">
			<b-collapse v-if="subjects" id="collapse-show-subjects">
				<Pagination title="Latest subjects:" :payload="payload" @shiftPage="shiftPage" :overlayShow="overlayShow">
					<AppButton
						v-for="subject in subjects" :key="subject.id" 
						class="mt-2"
						:label="subject.title"
						:smallShadow="true"
						@appButtonClick="$emit('subjectButtonClick', subject.id)">
						{{ subject.title }}
					</AppButton>
				</Pagination>
			</b-collapse>	
		</b-col>
	</div>
</template>

<script>
import Pagination from '../shared/AppPagination.vue'

export default {
	name: 'show-subjects',
	props: {
		buttonLabel:{
			type: String,
			required: true
		},
	},
	components: { Pagination },
	data() {
		return {
			subjects: [],
			payload: {},
			overlayShow: false
		}
	},
	methods: {
		shiftPage() {
			console.log('shift')
		},
		fetchSubjects() {
			this.$http.get('/api/english/subjects-user', { params: { userId: 2, page: 0, size: 5, sort: 'creationDate,desc', level: 'hard' }})
			.then((response) => {
				this.subjects = response.data.content
				this.payload = response.data
			}) 
			.catch((error) => console.log(error))
		}
	}
}
</script>

<style>

</style>