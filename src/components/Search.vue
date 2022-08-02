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
							class="w-50"
							v-model="$v.searchQuery.$model"
							@change="$v.searchQuery.$touch()"
							type="text"
							:placeholder="inputLabel"
							required>
						</b-form-input>
						<b-form-select v-if="!isSubjectsFilteredByUser" class="form-control" v-model="searchOptionSelected" :options="searchOptions"></b-form-select>
						<b-button style="background-color: #ffa726;" type="submit">Search</b-button>
					</b-input-group>
					<span v-if="$v.searchQuery.$error" class="text-danger">This field is required</span>
			</b-form-group>
		</b-form>
		<div v-if="searching">
			<div v-if="searchOptionSelected === 0">
				<Pagination title='Results found:' :payload="payloadSearch" @shiftPage="shiftSearchPage" :overlayShow="overlayShowSearch">
					<SubjectItems :subjects="payloadSearch.content" :overlayShow="overlayShowSearch"/>
				</Pagination>
			</div>
			<div v-else>
				<Pagination title='Results found:' :payload="payloadSearch" @shiftPage="shiftSearchPage" :overlayShow="overlayShowSearch">
					<UserItems :users="payloadSearch.content" :overlayShow="overlayShowSearch"/>
				</Pagination>
			</div>
		</div>
	</div>
</template>

<script>
import SubjectItems from './lists/SubjectItems.vue'
import UserItems from './lists/UserItems.vue'
import Pagination from './Pagination.vue'
import { required } from 'vuelidate/lib/validators'

export default {
	name: 'search',
	props: {
		isSubjectsFilteredByUser: {
			type: Boolean,
			default: false
		},
		inputLabel: {
			type: String,
			default: "What are you looking for?"
		},
		userId: {
			type: Number,
			default: null
		}
	},
	data() {
		return {
			searchQuery: '',
			disableButton: false,
			searching: false,
			payloadSearch: {},
			pageRequest: 0,
			pageSize: 6,
			overlayShowSearch: true,
			searchOptionSelected: 0,
			searchOptions: [
				{ value: 0, text: 'by subject' },
				{ value: 1, text: 'by user' },
			]
		}
	},
	watch: {
		searchOptionSelected() {
			this.searching = false
		}
	},
	components: {
		SubjectItems,
		Pagination,
		UserItems
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
				this.componentKey++
				this.overlayShowSearch = true

				let request = null

				if(this.isInputSearchSubjectsFilteredByUser()) {
					request = this.$http.getReducedSubjects(this.pageRequest, this.pageSize, 'creationDate,desc', this.searchQuery, this.userId)
				} else if(this.IsInputSearchSubjects()) {
					request = this.$http.getReducedSubjects(this.pageRequest, this.pageSize, 'creationDate,desc', this.searchQuery)
				} else {
					request = this.$http.getTeachers( this.pageRequest, this.pageSize, this.searchQuery)
				}
				this.makeRequest(request)
			} else {
				this.$v.$touch()
			}
		},
		isInputSearchSubjectsFilteredByUser() {
			return this.searchOptionSelected === 0 && this.isSubjectsFilteredByUser
		},
		IsInputSearchSubjects() {
			return this.searchOptionSelected === 0 && !this.isSubjectsFilteredByUser
		},
		makeRequest(request) {
			request.then((response) => {
				this.payloadSearch = response.data
				this.overlayShowSearch = false
				this.disableButton = false
			})
			.catch((error) => {
				this.$notice['error']({
					title: 'Error',
					description: 'Could not retrieve data. ' + error,
					styles: { top: "4em" }
				})
				this.overlayShowSearch = false
				this.disableButton = false
			})
		},
		shiftSearchPage(index) {
			this.overlayShowSearch = true
			this.disableButton = true

			let url = ''
			let params = { page: index, size: this.pageSize, query: this.searchQuery, sort: '' }

			if(this.searchOptionSelected === 0) {
				url = '/api/subjects/reducedList'
				params.sort = 'creationDate,desc'
			} else {
				url = '/api/user/teachers'
			}
			this.makeRequest(url, params)
		},
		enableButton() {
			this.disableButton = false
		}
	}
}
</script>

<style>

</style>