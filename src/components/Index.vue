<template>
	<b-row class="mt-lg-4 mt-3 mx-auto">
		<b-col cols="12" style="line-height: normal;">
			<p id="home-main-text">Improve on your English with steady practice! Join<span style="color: #1a237e;">English Training Quizzes</span>!</p>
		</b-col>
		<b-col cols="12" xl="10" offset-xl="1" class="mt-4">
			<b-form @submit.prevent="search" novalidate>
				<b-form-group
					id="search-input-group"
					label-for="search-input">
					<b-row>
						<b-col cols="10">
							<b-input-group>
								<template #prepend>
									<b-input-group-text><font-awesome-icon style="height: 25px;" icon="fa-solid fa-magnifying-glass"/></b-input-group-text>
								</template>
								<b-form-input
									id="search-input"
									v-model="$v.searchQuery.$model"
									@change="$v.searchQuery.$touch()"
									type="text"
									placeholder="What are you looking for?"
									required>
								</b-form-input>
							</b-input-group>
							<span v-if="$v.searchQuery.$error" class="text-danger">This field is required</span>
						</b-col>
						<b-col cols="2">
							<AppButton buttonType="submit" :disabled="disableButton">
								Go!
							</AppButton>
						</b-col>
					</b-row>
				</b-form-group>
				
			</b-form>
		</b-col>
		<b-col v-if="searching" cols="12" xl="10" offset-xl="1">
			<Pagination title='Results found:' :payload="payloadSearch" @shiftPage="shiftPageSearch" :key="componentKey" :overlayShow="overlayShowSearch">
				<SubjectItems :subjects="payloadSearch.content"/>
			</Pagination>
		</b-col>
		<b-col cols="12" xl="10" offset-xl="1" class="mt-3">
			<Pagination title="Latest subjects:" :payload="payload" @shiftPage="shiftPage" :overlayShow="overlayShow">
				<SubjectItems :subjects="payload.content"/>
			</Pagination>
		</b-col>
		<b-col cols="12" class="mx-auto">
			<img id="home-main-image" class="center" src="../assets/home.svg" alt="English training quizzes home image">
		</b-col>
	</b-row>

</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from './buttons/AppButton.vue'
import Pagination from './shared/AppPagination.vue'
import SubjectItems from './shared/SubjectItems.vue'
import { required } from 'vuelidate/lib/validators'

export default {
	name: 'Index',
	components: {
		AppButton,
		Pagination,
		SubjectItems
	},
	data() {
		return {
			searchQuery: '',
			disableButton: false,
			searching: false,
			componentKey: 0,
			payload: '',
			payloadSearch: '',
			pageRequest: null,
			pageSize: 2,
			overlayShow: false,
			overlayShowSearch: false
		}
	},
	computed: {
		...mapGetters(['userIsSignedIn']),
	},
	validations() {
		return {
			searchQuery: { required }
		}
	},
	mounted() {
		this.pageRequest = 0
		this.overlayShow = true
		this.$http.get('/api/subjects/reducedList', {params:{page: this.pageRequest, size: this.pageSize, sort: 'creationDate,desc', query: this.searchQuery}})
		.then((response) => {
			this.payload = response.data
			this.overlayShow = false
		})
		.catch((error) => {
			console.log(error)
			this.overlayShow = false
		})
	},
	methods: {
		redirectToEnglishApp() {
			this.$router.push({path: '/english_app'})
		},
		search() {
			this.disableButton = true
			if(!this.$v.$invalid) {
				this.searching = true
				this.componentKey++
				this.overlayShowSearch = true
				this.$http.get('/api/subjects/reducedList', {params:{page: this.pageRequest, size: this.pageSize, sort: 'creationDate,desc', query: this.searchQuery}})
				.then((response) => {
					this.payloadSearch = response.data
					this.overlayShowSearch = false
					this.disableButton = false
				})
				.catch((error) => {
					console.log(error)
					this.overlayShowSearch = false
					this.disableButton = false
				})
			} else {
				this.$v.$touch()
			}
		},
		enableButton() {
			this.disableButton = false
		},
		shiftPage(index) {
			this.overlayShow = true
			this.$http.get('/api/subjects/reducedList', {params:{page: index, size: this.pageSize, sort: 'creationDate,desc'}})
			.then((response) => {
				this.payload = response.data
				this.overlayShow = false
			})
			.catch((error) => {
				console.log(error)
				this.overlayShow = false
			})
		},
		shiftPageSearch(index) {
			this.overlayShowSearch = true
			this.disableButton = true
			this.$http.get('/api/subjects/reducedList', {params:{page: index, size: this.pageSize, sort: 'creationDate,desc', query: this.searchQuery}})
			.then((response) => {
				console.log(response.data)
				this.payloadSearch = response.data
				this.overlayShowSearch = false
				this.disableButton = false
			})
			.catch((error) => {
				console.log(error)
				this.overlayShowSearch = false
				this.disableButton = false
			})
		}
		
	},
}

</script>

<style scoped>
@charset "UTF-8";

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

#home-main-text {
	font-size: 3.5em!important; 
	font-weight: bold!important;
	text-shadow: 3px 3px #808080;
	text-align: center;
}

#home-main-image {
	width:230px;
	height:220px;
}

@media only screen and (max-width: 1200px) {
	#home-main-text {
		font-size: 3em!important;
	}
	
	#home-main-image {
		width:220px;
		height:210px;
	}
}

@media only screen and (max-width: 992px) {
	#home-main-text {
		font-size: 2.3em!important;
		text-shadow: 2px 2px #808080;
		text-align: center;
	}

	#home-main-image {
		width:190px;
		height:180px;
	}
}

@media only screen and (max-width: 576px) {
	#home-main-text {
		font-size: 2.2em!important;
		text-shadow: 1px 1px #808080;
	}
	#home-main-image {
		width:180px;
		height:170px;
	}
}

</style>