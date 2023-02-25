<template>
	<b-overlay :show="overlayShow" rounded="sm">
		<b-list-group>
			<b-list-group-item href="#" v-for="subject in subjects" :key="subject.id" @click="open(subject)">
				<div class="d-flex w-100 justify-content-between" v-if="subject.user">
					<div class="d-flex align-items-start">
						<b-avatar class="mt-1" size="lg" :src="subject.user.pictureUrl ? subject.user.pictureUrl : 'https://cdn-icons-png.flaticon.com/512/64/64572.png'"></b-avatar>
						<b-row>
							<b-col cols="12">
								<h6 style="font-size: .8em; line-height: .9;" v-if="mobileUtil.isMobile()" class="ms-3 mt-1">{{ subject.title }}</h6>
								<h5 v-else class="ms-3 mt-1">{{ subject.title }}</h5>
							</b-col>
							<b-col cols="12">
								<small style="font-size: .7em;" class="ms-3">
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
	</b-overlay>
</template>

<script>
import { DateUtil } from '../../utils/DateUtil'
import { MobileUtil } from '../../utils/MobileUtil'

const dateUtil = new DateUtil()
const mobileUtil = new MobileUtil()

export default {
	name: 'subjects-items',
	props: { 
		subjects: Array, 
		overlayShow: Boolean 
	},
	data() {
		return {
			mobileUtil: mobileUtil
		}
	},
	methods: {
		open(subject) {
			this.$emit('subjectItemClick', subject)
		},
		formatDate(creationDate) {
			return dateUtil.formatDate(creationDate)
		},
	}
}
</script>

<style>

</style>