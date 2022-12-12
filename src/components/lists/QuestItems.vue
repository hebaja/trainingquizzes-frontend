<template>
	<div>
		<b-card 
			v-for="quest in quests" 
			:key="quest.id" 
			@click="openQuest(quest.id)" 
			:header-bg-variant="quest.finished ? 'light' : 'warning'"
			:border-variant="quest.finished ? '' : 'dark'"
			class="mb-2 shadow-sm"
			style="cursor: pointer;"
			no-body>
			<template #header>
				<h4 class="mb-0">{{ quest.title }}</h4>
			</template>
			<b-card-body>
				<b-card-title><h5><font-awesome-icon class="me-1" icon="fa-solid fa-book"/>{{ quest.subject.title }}</h5></b-card-title>
				<b-card-sub-title>{{ quest.subject.level }}</b-card-sub-title>
			</b-card-body>
			<b-card-footer>
				<b-row>
					<b-col class="d-flex justify-content-center">
						<small><font-awesome-icon icon="fa-solid fa-hourglass-start" /> {{ formatDate(quest.startDate) }}</small>
					</b-col>
					<b-col class="d-flex justify-content-center">
						<small><font-awesome-icon icon="fa-solid fa-hourglass-end" /> {{ formatDate(quest.finishDate) }}</small>
					</b-col>
					<b-col class="d-flex justify-content-center">
						<small><font-awesome-icon icon="fa-solid fa-users" /> {{ quest.subscribedUsers.length }}</small>
					</b-col>
				</b-row>
			</b-card-footer>
		</b-card>
	</div>
</template>

<script>
import { DateUtil } from '../../utils/DateUtil'
const dateUtil = new DateUtil

export default {
	name: 'quest-items',
	props: ['quests'],
	methods: {
		openQuest(id) {
			this.$emit('questItemClick', id)
		},
		formatDate(rawDate) {
			return dateUtil.formatDate(rawDate)
        },
		questIsFinished(quest) {
			return quest.finished ? 'color: #bfbfbf;' : ''
		}
		
	},
}
</script>

<style>

</style>