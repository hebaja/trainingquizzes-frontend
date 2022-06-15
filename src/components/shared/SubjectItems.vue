<template>
	<b-list-group>
		<b-list-group-item href="#" v-for="subject in subjects" :key="subject.id" @click="open(subject.id)">
			<div class="d-flex w-100 justify-content-between">
				<div class="d-flex align-items-start">
					<b-avatar class="mt-1" size="lg" :src="subject.user.pictureUrl ? subject.user.pictureUrl : 'https://icones.pro/wp-content/uploads/2022/02/services-parametres-et-icone-d-engrenage-jaune.png'"></b-avatar>
					<b-row>
						<b-col cols="12">
							<h5 class="ms-3 mt-1">{{ subject.title }}</h5>
						</b-col>
						<b-col cols="12">
							<small class="ms-3">
								{{ subject.level }}
							</small>
						</b-col>
					</b-row>
				</div>
				<div>
					<b-row>
						<b-col class="d-flex justify-content-end" cols="12">
						<small>{{ formatDate(subject.creationDate) }}</small>
						</b-col>
						<b-col class="d-flex justify-content-end mt-3" cols="12">
							<small>Made by {{ subject.user.username }}</small>
						</b-col>
					</b-row>
				</div>
			</div>
		</b-list-group-item>
	</b-list-group>
</template>

<script>
export default {
	name: 'subjects-items',
	props: ['subjects'],
	methods: {
		open(subjectId) {
			this.$router.push({ name: 'quiz', params: { subjectId: subjectId } })
		},
		formatDate(creationDate) {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];
            let date = new Date(creationDate)
            return ((months[(date.getMonth())] + " " + date.getDate() + " " + date.getFullYear()))
        },
	}
}
</script>

<style>

</style>