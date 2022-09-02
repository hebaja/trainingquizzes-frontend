<template>
	<div>
		<b-list-group v-for="score in scores" :key="score.key">
			<b-list-group-item>
				<div class="d-flex w-100 justify-content-between">
					<span class="w-75">
						<b-avatar 
							size="sm"
							class="me-2"
							:src="score.pictureUrl ? score.pictureUrl : 'https://cdn-icons-png.flaticon.com/512/64/64572.png'"
						/>
						{{ score.username }} ({{ score.email }})
					</span>
					<span class="w-25">
						<Gauge :score="score.score"/>
					</span>
				</div>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
import Gauge from '../Gauge.vue';

export default {
	name: 'score',
	props: {
		scores: {
			type: Array,
			required: true
		}
	},
	components: { Gauge }
}
</script>

<style>

</style>