<template>
	<b-list-group>
		<b-list-group-item href="#" v-for="subject in subjects" :key="subject.id" @click="openSubject(subject)">
			<b-row class="d-flex w-100 justify-content-between">
				<b-col cols="7">
					<span><font-awesome-icon class="me-1" icon="fa-solid fa-book"/>{{ subject.title }}</span>
				</b-col>
				<b-col cols="5">
					<b-row>
						<b-col cols="12" class="d-flex flex-row-reverse">
							<small><font-awesome-icon icon="fa-solid fa-clock" /> {{ formatDate(subject.creationDate) }}</small>
						</b-col>
						<b-col cols="12" class="d-flex flex-row-reverse">
							<small>{{ subject.level }}</small>
						</b-col>
					</b-row>
									
					
				</b-col>
			</b-row>

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
		openSubject(subject) {
			this.$emit('subjectItemClick', subject.id)
		},
		formatDate(date) {
			return dateUtil.formatDate(date)
		}
	}


}
</script>

<style>

</style>