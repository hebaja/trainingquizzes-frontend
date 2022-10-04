<template>
	<div>
		<button @click="go">Click here to sign in</button>
	</div>
	
</template>

<script>
export default {
	name: "android-redirect",
	mounted() {
		// window.location.href = "http://androidapp.gogo?intent=signin"
	},
	created() {
		// window.location.href = "http://androidapp.gogo?intent=signin"
	},
	methods: {
		go() {
			window.location.href = "http://tq-androidapp-user.com?intent=signin"
		}
	}

	
}
</script>


<style>

</style>