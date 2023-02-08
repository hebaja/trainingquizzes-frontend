<template>
	<div>
		<b-form @submit.prevent="search" novalidate>
			<b-form-group
				id="search-input-group"
				label-for="search-input">
					<b-input-group>
						<template #prepend>
							<b-input-group-text><font-awesome-icon style="height: 25px;" icon="fa-solid fa-magnifying-glass"/></b-input-group-text>
						</template>
						<b-form-input
							id="search-input"
							v-model="$v.searchQuery.$model"
							@change="$v.searchQuery.$touch()"
							type="text"
							placeholder="Search"
							required>
						</b-form-input>
						<b-button style="background-color: #ffa726;" type="submit">
							Go
						</b-button>
					</b-input-group>
					<span v-if="$v.searchQuery.$error" class="text-danger">This field is required</span>
			</b-form-group>
		</b-form>
		<div v-if="searching">
			<Pagination :payload="payload" :overlayShow="overlayShow" @shiftPage="shiftQuestsPage">
				<QuestItems :quests="payload.content" @questItemClick="$emit('questItemClick', $event)"/>
			</Pagination>
		</div>
	</div>
</template>

<script>
import Pagination from './Pagination.vue';
import QuestItems from './lists/QuestItems.vue'
import { required } from 'vuelidate/lib/validators'

export default {
	name: 'quest-search',
	props: {
		userId: {
			type: Number,
			default: null
		},
		isSubscribedQuests: {
			type: Boolean,
			default: false
		}
	},	
	data() {
		return {
			searchQuery: '',
			disableButton: false,
			searching: false,
			payload: {},
			pageRequest: 0,
			pageSize: 6,
			overlayShow: true,
		}
	},	
	components: {
		Pagination,
		QuestItems
	},
	validations() {
		return {
			searchQuery: { required }
		}
	},
	methods: {
		search() {
			this.disableButton = true
			if(!this.$v.$invalid) {
				this.searching = true
				this.overlayShow = true
				let request = null
				if(this.isSubscribedQuests) {
					request = this.$http.getSubscribedQuestsByTitle(this.pageRequest, this.pageSize, this.searchQuery, this.userId)
				} else {
					request = this.$http.getCreatedQuestsByTitle(this.pageRequest, this.pageSize, this.searchQuery, this.userId)
				}
				this.makeRequest(request)
				
			} else {
				this.$v.$touch()
			}
		},
		makeRequest(request) {
			request.then((response) => {
					console.log(response.data)
					this.payload = response.data
					this.overlayShow = false
					this.disableButton = false
				})
				.catch((error) => {
					console.log(error)
					this.$notice['error']({
						title: 'Error',
						description: 'Could not retrieve data. ' + error,
						styles: { top: "4em" }
					})
					this.overlayShow = false
					this.disableButton = false
				})
		},
		shiftQuestsPage(page) {
			this.overlayShow = true
			if(this.userIsTeacher) {
				this.requestCreatedQuests(page)
			} else {
				this.requestSubscribedQuests(page)
			}
		},
	}
}
</script>

<style>

</style>