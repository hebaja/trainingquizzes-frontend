<template>
	<div>
		<b-col cols="12" lg="8" offset-lg="2" class="mt-3">
			<AppButton
				buttonType="button"
				v-b-toggle.collapse-show-partial-results>
					Show partial score
					<font-awesome-icon 
						class="ms-2" 
						icon="fa-solid fa-star-half-stroke" />
			</AppButton>
		</b-col>
		<b-col v-if="questScore" cols="12" lg="8" offset-lg="2">
			<b-collapse id="collapse-show-partial-results" class="mt-2">
				<span v-if="questScore">
					<QuestScore :scores="questScore" />
				</span>
				<span v-else>Nothing was done</span>
			</b-collapse>
		</b-col>
	</div>
</template>

<script>
import QuestScore from './QuestScore.vue';
import { QuestUtil } from '../../utils/QuestUtil';

const questUtil = new QuestUtil()

export default {
	name: 'show-partial-score',
	props: {
		quest: {
			type: Object,
			required: true
		},
	},
	components: {
		QuestScore
	},
	computed: {
		questScore() {
			return questUtil.calculateUserScores(this.quest)
		}
	},
	
	

}
</script>

<style>

</style>