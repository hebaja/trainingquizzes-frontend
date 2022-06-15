<template>
	<b-list-group>
		<b-list-group-item href="#" v-for="quest in quests" :key="quest.id" class="flex-column align-items-start" @click="open(quest.id)">
			<div class="d-flex w-100 justify-content-between">
				<div>
					<h4 class="ms-3">{{ quest.title }}</h4>
					<h6 class="ms-3">Subject: {{ quest.subject.title }}</h6>
					<small class="ms-3">{{ quest.subject.level }}</small>
				</div>
				<div>
					<small class="me-3 position-absolute end-0"><font-awesome-icon icon="fa-solid fa-hourglass-start" /> {{ formatDate(quest.startDate) }}</small>
					<br/>
					<small class="me-3 position-absolute end-0"><font-awesome-icon icon="fa-solid fa-hourglass-end" /> {{ formatDate(quest.finishDate) }}</small>
					<br/>
					<small class="me-3 position-absolute end-0"><font-awesome-icon icon="fa-solid fa-users" /> {{ quest.enrolledUsers.length }}</small>
				</div>
			</div>
		</b-list-group-item>
	</b-list-group>
</template>

<script>
export default {
	name: 'quest-items',
	props: ['quests'],
	methods: {
		formatDate(creationDate) {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];
            let date = new Date(creationDate)
            return ((months[(date.getMonth())] + " " + date.getDate() + " " + date.getFullYear()))
        }
	}
}
</script>

<style>

</style>