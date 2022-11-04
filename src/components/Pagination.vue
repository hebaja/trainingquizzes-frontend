<template>
    <div id="pagination" class="mt-2">
		<b-overlay :show="overlayShow" rounded="sm">
			<h4>{{ title }}</h4>
			<div v-if="payload.empty">
				<h5>Nothing was found</h5>
			</div>
			<div v-else>
				<slot></slot>
				<nav class="mt-1">
					<ul class="pagination">
						<li
							class="page-item"
							:class="payload.first ? 'disabled' : ''">
								<a class="page-link"
									@click.prevent="goToFirstPage"
									onclick="this.blur();"
									href="#">
										<font-awesome-icon class="ms-1" icon="fa-solid fa-angles-left" />
								</a>
						</li>
						<li
							class="page-item" 
							:class="payload.first ? 'disabled' : ''">
								<a class="page-link"
									@click.prevent="pageBack"
									onclick="this.blur();"
									href="#">
										<font-awesome-icon class="ms-1" icon="fa-solid fa-angle-left" />
								</a>
						</li>
						<li 
							v-for="(item, index) in builtPagination" 
							:key="item.page" 
							class="page-item pagination-item"
							:class="item.class">
								<a 
									class="page-link"
									:class="item.linkClass"
									href="#"
									@click.prevent="shiftPage(index)"
									onclick="this.blur();">
										{{ item.page }}
								</a>
							</li>
						<li 
							class="page-item pagination-item"
							:class="payload.last ? 'disabled' : ''">
								<a 
									class="page-link"
									@click.prevent="pageForward"
									onclick="this.blur();"
									href="#">
										<font-awesome-icon class="ms-1" icon="fa-solid fa-angle-right" />
								</a>
						</li>
						<li 
							class="page-item pagination-item"
							:class="payload.last ? 'disabled' : ''">
								<a 
									class="page-link"
									@click.prevent="goToLastPage"
									onclick="this.blur();"
									href="#">
										<font-awesome-icon class="ms-1" icon="fa-solid fa-angles-right" />
								</a>
						</li>
					</ul>
				</nav>
			</div>
		</b-overlay>
	</div>
</template>

<script>
export default {
    name: 'pagination',
	props: {
		title: String,
		payload: Object,
		overlayShow: Boolean
	},
    data() {
        return {
            subjects: {},
			subjectsOverlayShow: false,
        }
    },
	computed: {
		builtPagination() {
			let pagination = []
			for(let i = 0; i < this.payload.totalPages; i++) {
				if(i === this.payload.number) {
					pagination.push({
						page: i + 1 , class: 'active', linkClass: 'disabled-link'
					})
				} else {
					pagination.push({
						page: i + 1 , class: '', linkClass: ''
					})
				}
			}
			return pagination
		},
		pageRequest() {
			return this.payload.number
		}
	},
    methods: {
		buildPagination(totalPages, pageNumber) {
			for(let i = 0; i < totalPages; i++) {
				if(i === pageNumber) {
					this.pagination.push({
						page: i + 1 , class: 'active', linkClass: 'disabled-link'
					})
				} else {
					this.pagination.push({
						page: i + 1 , class: '', linkClass: ''
					})
				}
			}
		},
		shiftPage(index) {
			this.$emit('shiftPage', index)
		},
		pageBack() {
			let shift = this.pageRequest - 1
			this.shiftPage(shift)
		},
		pageForward() {
			let shift = this.pageRequest + 1
			this.shiftPage(shift)
		},
		goToFirstPage() {
			this.shiftPage(0)
		},
		goToLastPage() {
			let shift = this.payload.totalPages - 1
			this.shiftPage(shift)
		}
    }
}
</script>

<style>
.disabled-link {
	pointer-events: none;
}
.pagination-item:focus {
	outline: none;
	box-shadow: none;
}
.pagination > li > a {
	color: #333333;
}

.pagination > .active > a {
    color: white;
    background-color: #ffa726!important;
    border: solid 1px #333333!Important;
}
</style>