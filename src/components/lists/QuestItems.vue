<template>
	<b-list-group>
		<b-list-group-item href="#" v-for="quest in quests" :key="quest.id" class="flex-column align-items-start" @click="openQuest(quest.id)">
			<div class="d-flex w-100 justify-content-between">
				<div>
					<h4 class="ms-3">{{ quest.title }}</h4>
					<h6 class="ms-3"><font-awesome-icon class="me-1" icon="fa-solid fa-book"/>{{ quest.subject.title }}</h6>
					<small class="ms-3">{{ quest.subject.level }}</small>
				</div>
				<div>
					<small class="me-3 position-absolute end-0"><font-awesome-icon icon="fa-solid fa-hourglass-start" /> {{ formatDate(quest.startDate) }}</small>
					<br/>
					<small class="me-3 position-absolute end-0"><font-awesome-icon icon="fa-solid fa-hourglass-end" /> {{ formatDate(quest.finishDate) }}</small>
					<br/>
					<small class="me-3 position-absolute end-0"><font-awesome-icon icon="fa-solid fa-users" /> {{ quest.subscribedUsers.length }}</small>
				</div>
			</div>
		</b-list-group-item>
	</b-list-group>
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
		
	},
}
</script>

<style>

</style>