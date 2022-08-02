<template>
	<div>
		<b-col cols="12" lg="8" offset-lg="2" class="mt-3">
			<AppButton
				buttonType="button"
				v-b-toggle.collapse-show-user-results>
					Show trials done
					<font-awesome-icon 
						class="ms-2" 
						icon="fa-solid fa-list" />
			</AppButton>
		</b-col>
		<b-col cols="12" lg="8" offset-lg="2">
			<b-collapse id="collapse-show-user-results" class="mt-2">
				<b-list-group v-if="trialsDone.length > 0 && thereIsResult">
					<b-list-group-item href="#" v-for="trial in trialsDone" :key="trial.id">
						<b-avatar 
							size="sm"
							class="me-2"
							:src="trial.pictureUrl ? trial.pictureUrl : 'https://cdn-icons-png.flaticon.com/512/64/64572.png'" />
							{{ trial.username }} ({{ trial.email }}) - 
							<font-awesome-icon icon="fa-solid fa-flag" class="me-1"/> Trial {{ trial.trialNumber }} - 
							<font-awesome-icon icon="fa-soli fa-star" class="me-1" /> Score: {{ trial.score }}
					</b-list-group-item>
				</b-list-group>
				<span v-else>Nothing was done</span>
			</b-collapse>
		</b-col>
	</div>
</template>

<script>
import AppButton from '../buttons/AppButton.vue'

export default {
	name: 'show-trials-done',
	props: {
		trialsDone: {
			type: Array,
			required: true
		},
		thereIsResult: {
			type: Boolean,
			required: true
		}
	},
	components: { AppButton }
}
</script>

<style>

</style>