<template>
	<b-list-group>
		<b-list-group-item href="#" v-for="subject in subjects" :key="subject.id" @click="openSubject(subject.id)">
			<div class="d-flex w-100 justify-content-between">
				<div>
					<span><font-awesome-icon class="me-1" icon="fa-solid fa-book"/>{{ subject.title }}</span>
				</div>
				<div>
					<small class="me-3 position-absolute end-0"><font-awesome-icon icon="fa-solid fa-clock" /> {{ formatDate(subject.creationDate) }}</small>
					<br>
					<small class="ms-3">{{ subject.level }}</small>
				</div>
			</div>

		</b-list-group-item>
	</b-list-group>

</template>

<script>
import { DateUtil } from '../../utils/DateUtil';

const dateUtil = new DateUtil

export default {
	name: 'subjects-items',
	props: {
		subjects: Array
	},
	methods: {
		openSubject(subjectId) {
			this.$emit('subjectItemClick', subjectId)
		},
		formatDate(date) {
			return dateUtil.formatDate(date)
		}
	}


}
</script>

<style>

</style>