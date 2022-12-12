<template>
	<b-progress 
		max="100"
		height="1.8em"
		show-value
	>
		<b-progress-bar max="100"
			:value="score"
			:variant="
				score <= 40 ? 'danger' :
				score > 40 && score < 80 ? 'warning' :
				'success'" 
			show-progress animated
		>
			<strong>
				<span id="average-text">{{ score.toFixed(1) }}%</span>
			</strong>
		</b-progress-bar>
	</b-progress>
</template>

<script>
export default {
	name: 'gauge',
	props: {
		score: {
			type: Number,
			required: true
		}
	}
}
</script>

<style>

</style>